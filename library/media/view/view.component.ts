import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/ng';
import { Transport } from '@weplanx/ng/upload';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { PictureComponent } from './picture/picture.component';
import { VideoComponent } from './video/video.component';
import { WpxMediaViewDataSource } from './view.data-source';
import { MediaService } from '../media.service';
import { PicturesService } from '../pictures.service';
import { Media, MediaType } from '../types';
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
  private media!: MediaService;

  @Input() wpxType!: MediaType;
  @Input() wpxFallback!: string;
  @Input() wpxHeight?: string;
  @Input() wpxMax?: number;

  ds!: WpxMediaViewDataSource;
  ext!: string;
  accept!: string[];
  searchText: string = '';
  private maxMessage?: string;

  constructor(
    private wpx: WpxService,
    private image: NzImageService,
    private message: NzMessageService,
    private modal: NzModalService,
    @Optional() public modalRef: NzModalRef,
    @Optional() private pictures: PicturesService,
    @Optional() private videos: VideosService
  ) {}

  ngOnInit(): void {
    switch (this.wpxType) {
      case 'pictures':
        this.media = this.pictures;
        this.ext = 'image';
        this.accept = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp', 'image/avif'];
        break;
      case 'videos':
        this.media = this.videos;
        this.ext = 'video';
        this.accept = ['video/mp4'];
        break;
    }
    this.ds = new WpxMediaViewDataSource(this.media);
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.calculate(entry.contentRect.width);
      }
    });
    // if (this.modalRef) {
    //   this.modalRef.afterOpen.subscribe(() => {
    //     this.modalRef.updateConfig({
    //       nzTitle: this.wpxSearchRef
    //     });
    //   });
    // }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.viewport.elementRef.nativeElement);
  }

  getData(refresh = false): void {
    this.ds.setSearchText(this.searchText);
    this.ds.fetch(refresh);
  }

  clearSearch(): void {
    this.searchText = '';
    this.ds.clearSearchText();
    this.getData(true);
  }

  checked(id: string, checked: boolean): void {
    this.ds.setChecked(id, checked);
    if (this.wpxMax && this.ds.checkedNumber > this.wpxMax) {
      if (!this.maxMessage) {
        this.maxMessage = this.message.info(`超出确认范围，系统将截取前${this.wpxMax}个元素，批量操作请忽略`, {
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

  previewPicture(data: AnyDto<Media>): void {
    const url = new URL(`${this.wpx.assets}/${data.url}`);
    if (data.params) {
      for (const [name, value] of Object.entries(data.params)) {
        url.searchParams.append(name, value);
      }
    }
    this.image.preview([
      {
        src: url.toString(),
        alt: data.name
      }
    ]);
  }

  previewPoster(data: AnyDto<Media>): void {
    this.image.preview(
      [0, 1, 2].map(n => ({
        src: `${this.wpx.assets}/${data.url}_${n}.jpg`
      }))
    );
  }

  form(editable: AnyDto<Media>): void {
    this.modal.create({
      nzTitle: '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        editable,
        media: this.media
      }
    });
  }

  picture(data: AnyDto<Media>): void {
    this.modal.create({
      nzTitle: '图片设置',
      nzWidth: 960,
      nzContent: PictureComponent,
      nzComponentParams: {
        data
      }
    });
  }

  video(data: AnyDto<Media>): void {
    this.modal.create({
      nzTitle: data.name,
      nzWidth: 960,
      nzContent: VideoComponent,
      nzComponentParams: {
        url: data.url
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
      this.message.success('数据删除完成');
      this.ds.fetch(true);
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确认要删除这些文件吗?',
      nzOkText: '是的',
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
            this.message.success('数据删除完成');
          });
      },
      nzCancelText: '否'
    });
  }
}
