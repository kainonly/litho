import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Inject, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/ng';
import { Transport } from '@weplanx/ng/upload';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { PictureComponent } from './picture/picture.component';
import { TagsComponent } from './tags/tags.component';
import { VideoComponent } from './video/video.component';
import { WpxMediaViewDataSource } from './view.data-source';
import { PictureTagsService } from '../picture-tags.service';
import { PicturesService } from '../pictures.service';
import { Media, MediaTag, MediaType, Option, OPTION, Picture, Video } from '../types';
import { VideoTagsService } from '../video-tags.service';
import { VideosService } from '../videos.service';

@Component({
  selector: 'wpx-media-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class WpxMediaViewComponent implements OnInit, AfterViewInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private resizeObserver!: ResizeObserver;
  private media!: PicturesService | VideosService;
  private tags!: PictureTagsService | VideoTagsService;

  @Input() wpxType!: MediaType;
  @Input() wpxFallback!: string;
  @Input() wpxHeight?: string;
  @Input() wpxMax?: number;
  @Input() wpxForm?: (editable: AnyDto<Media>) => void;

  ds!: WpxMediaViewDataSource;
  ext!: string;
  accept!: string[];
  searchText: string = '';
  tagOptions: Array<AnyDto<MediaTag>> = [];
  tagIds: string[] = [];
  private maxMessage?: string;

  constructor(
    private wpx: WpxService,
    private image: NzImageService,
    private message: NzMessageService,
    private modal: NzModalService,
    private drawer: NzDrawerService,
    @Inject(OPTION) public option: Option,
    @Optional() public modalRef: NzModalRef,
    @Optional() private pictures: PicturesService,
    @Optional() private pictureTags: PictureTagsService,
    @Optional() private videos: VideosService,
    @Optional() private videoTags: VideoTagsService
  ) {}

  ngOnInit(): void {
    switch (this.wpxType) {
      case 'pictures':
        this.media = this.pictures;
        this.tags = this.pictureTags;
        this.ext = 'image';
        this.accept = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp', 'image/avif'];
        break;
      case 'videos':
        this.media = this.videos;
        this.tags = this.videoTags;
        this.ext = 'video';
        this.accept = ['video/mp4'];
        break;
    }
    this.getTags();
    this.ds = new WpxMediaViewDataSource(this.media);
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.calculate(entry.contentRect.width);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.viewport.elementRef.nativeElement);
  }

  getData(refresh = false): void {
    this.ds.filter = {};
    this.ds.xfilter = { 'tags.$in': 'oids' };
    if (this.searchText) {
      this.ds.filter['name'] = { $regex: this.searchText };
    }
    if (this.tagIds.length !== 0) {
      this.ds.filter['tags'] = { $in: this.tagIds };
    }
    this.ds.fetch(refresh);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = {};
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags.find(filter, { pagesize: 1000 }).subscribe(data => {
      this.tagOptions = [...data];
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  checked(id: string, checked: boolean): void {
    this.ds.setChecked(id, checked);
    if (this.wpxMax && this.ds.checkedNumber > this.wpxMax) {
      if (!this.maxMessage) {
        this.maxMessage = this.message.info($localize`超出确认范围，系统将截取前${this.wpxMax}个元素，批量操作请忽略`, {
          nzDuration: 0
        }).messageId;
      }
    } else {
      this.closeMaxMessage();
    }
  }

  private calculate(width: number): void {
    const n = width >= 1600 ? 8 : 6;
    if (this.ds.n !== n) {
      this.ds.n = n;
      this.ds.pagesize = n * 3;
      this.getData(true);
    }
  }

  private closeMaxMessage(): void {
    if (this.maxMessage) {
      this.message.remove(this.maxMessage);
      this.maxMessage = undefined;
    }
  }

  close(): void {
    this.closeMaxMessage();
    this.modalRef.triggerCancel();
  }

  submit(): void {
    this.closeMaxMessage();
    this.modalRef.triggerOk();
  }

  previewPicture(data: AnyDto<Picture>): void {
    let url = `${this.wpx.assets}/${data.url}`;
    if (data.query) {
      url += `?${data.query}`;
    }
    this.image.preview([
      {
        src: url,
        alt: data.name
      }
    ]);
  }

  previewPoster(data: AnyDto<Video>): void {
    this.image.preview(
      [0, 1, 2].map(n => ({
        src: `${this.wpx.assets}/${data.url}_${n}`
      }))
    );
  }

  openTags(): void {
    this.drawer.create({
      nzClosable: false,
      nzWidth: 640,
      nzContent: TagsComponent,
      nzContentParams: {
        tags: this.tags
      }
    });
  }

  form(doc: AnyDto<Media>): void {
    if (!this.wpxForm) {
      this.modal.create({
        nzTitle: $localize`编辑`,
        nzContent: FormComponent,
        nzComponentParams: {
          doc,
          media: this.media,
          tags: this.tags
        }
      });
    } else {
      this.wpxForm(doc);
    }
  }

  openPicture(doc: AnyDto<Picture>): void {
    this.modal.create({
      nzTitle: $localize`图片设置`,
      nzWidth: 960,
      nzContent: PictureComponent,
      nzComponentParams: {
        doc
      }
    });
  }

  openVideo(doc: AnyDto<Video>): void {
    this.modal.create({
      nzTitle: doc.name,
      nzWidth: 960,
      nzContent: VideoComponent,
      nzComponentParams: {
        url: doc.url
      },
      nzFooter: null
    });
  }

  upload(data: Transport[]): void {
    const docs: Media[] = data.map(v => ({
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.media.bulkCreate(docs).subscribe(v => {
      this.getData(true);
    });
  }

  bulkUnchecked(): void {
    this.ds.checkedIds.clear();
    this.ds.updateCheckedStatus();
  }

  delete(data: AnyDto<Media>): void {
    this.media.delete(data._id).subscribe(() => {
      this.message.success($localize`数据删除完成`);
      this.ds.fetch(true);
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确认要删除这些文件吗?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.media
          .bulkDelete(
            {
              _id: { $in: [...this.ds.checkedIds.values()] }
            },
            {
              xfilter: {
                '_id.$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.ds.checkedIds.clear();
            this.ds.updateCheckedStatus();
            this.ds.fetch(true);
            this.message.success($localize`数据删除完成`);
          });
      },
      nzCancelText: $localize`否`
    });
  }
}
