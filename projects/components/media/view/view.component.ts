import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, OnInit, Optional, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/common';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { MediaService } from '../media.service';
import { PicturesService } from '../pictures.service';
import { Media } from '../types';
import { VideosService } from '../videos.service';
import { FormComponent } from './form/form.component';
import { PictureComponent } from './picture/picture.component';
import { VideoComponent } from './video/video.component';
import { WpxMediaViewDataSource } from './view.data-source';

@Component({
  selector: 'wpx-media-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class WpxMediaViewComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private resizeObserver!: ResizeObserver;
  private media!: MediaService;

  @Input() type!: string;

  ds!: WpxMediaViewDataSource;

  constructor(
    private wpx: WpxService,
    private image: NzImageService,
    private message: NzMessageService,
    private modal: NzModalService,
    @Optional() private pictures: PicturesService,
    @Optional() private videos: VideosService
  ) {}

  ngOnInit(): void {
    switch (this.type) {
      case 'pictures':
        this.media = this.pictures;
        break;
      case 'videos':
        this.media = this.videos;
        break;
    }
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

  private calculate(width: number): void {
    const itemSize = width >= 1600 ? 6 : 4;
    if (this.ds.itemSize !== itemSize) {
      this.ds.itemSize = itemSize;
      this.ds.pageSize = itemSize * 3;
      this.ds.fetch(true);
    }
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
        data
      },
      nzFooter: null
    });
  }

  delete(data: AnyDto<Media>): void {
    this.media.delete(data._id).subscribe(() => {
      this.message.success('数据删除完成');
      this.ds.fetch(true);
    });
  }
}
