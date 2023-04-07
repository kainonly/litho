import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Inject, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/ng';
import { Transport } from '@weplanx/ng/upload';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ViewFormData } from './form/form.component';
import { PictureComponent, ViewPictureData } from './picture/picture.component';
import { VideoComponent, ViewVideoData } from './video/video.component';
import { WpxMediaViewDataSource } from './view.data-source';
import { PicturesService } from '../pictures.service';
import { Media, MediaType, MediaViewData, Option, OPTION, Picture, Video } from '../types';
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

  @Input() wpxData!: WpxMediaViewDataSource;
  @Input() wpxType!: MediaType;
  @Input() wpxFallback!: string;
  @Input() wpxHeight?: string;
  @Input() wpxMax?: number;
  @Input() wpxForm?: (editable: AnyDto<Media>) => void;
  @Input() wpxUpload!: (data: Transport[]) => void;

  ext!: string;
  accept!: string[];
  searchText: string = '';

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
    @Optional() private videos: VideosService,
    @Optional()
    @Inject(NZ_MODAL_DATA)
    private data: MediaViewData
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.wpxType = this.data.type;
      this.wpxFallback = this.data.fallback;
      this.wpxHeight = this.data.height;
      this.wpxMax = this.data.max;
      this.wpxForm = this.data.form;
      this.wpxUpload = this.data.upload;
    }
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
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.calculate(entry.contentRect.width);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.viewport.elementRef.nativeElement);
  }

  checked(id: string, checked: boolean): void {
    this.wpxData.setChecked(id, checked);
    if (this.wpxMax && this.wpxData.checkedNumber > this.wpxMax) {
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
    if (this.wpxData.n !== n) {
      this.wpxData.n = n;
      this.wpxData.pagesize = n * 3;
      this.wpxData.fetch(true);
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

  form(doc: AnyDto<Media>): void {
    if (!this.wpxForm) {
      this.modal.create<FormComponent, ViewFormData>({
        nzTitle: $localize`编辑`,
        nzContent: FormComponent,
        nzData: {
          doc,
          media: this.media
        }
      });
    } else {
      this.wpxForm(doc);
    }
  }

  openPicture(doc: AnyDto<Picture>): void {
    this.modal.create<PictureComponent, ViewPictureData>({
      nzTitle: $localize`图片设置`,
      nzWidth: 960,
      nzContent: PictureComponent,
      nzData: {
        doc
      }
    });
  }

  openVideo(doc: AnyDto<Video>): void {
    this.modal.create<VideoComponent, ViewVideoData>({
      nzTitle: doc.name,
      nzWidth: 960,
      nzContent: VideoComponent,
      nzData: {
        url: doc.url
      },
      nzFooter: null
    });
  }

  bulkUnchecked(): void {
    this.wpxData.checkedIds.clear();
    this.wpxData.updateCheckedStatus();
  }

  delete(data: AnyDto<Media>): void {
    this.media.delete(data._id).subscribe(() => {
      this.message.success($localize`数据删除完成`);
      this.wpxData.fetch(true);
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
              _id: { $in: [...this.wpxData.checkedIds.values()] }
            },
            {
              xfilter: {
                '_id.$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.wpxData.checkedIds.clear();
            this.wpxData.updateCheckedStatus();
            this.wpxData.fetch(true);
            this.message.success($localize`数据删除完成`);
          });
      },
      nzCancelText: $localize`否`
    });
  }
}
