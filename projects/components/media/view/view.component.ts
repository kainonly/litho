import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/common';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';

import { MediaService } from '../media.service';
import { Media } from '../types';
import { WpxMediaViewDataSource } from './view.data-source';

@Component({
  selector: 'wpx-media-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class WpxMediaViewComponent implements OnInit, AfterViewInit {
  @Input() type!: string;
  @Input() fallback?: string;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private resizeObserver!: ResizeObserver;

  ds!: WpxMediaViewDataSource;

  constructor(
    private wpx: WpxService,
    private media: MediaService,
    private image: NzImageService,
    private message: NzMessageService
  ) {
    this.ds = new WpxMediaViewDataSource(media);
  }

  ngOnInit(): void {
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
    const size = width >= 1600 ? 6 : 4;
    if (this.ds.itemSize !== size) {
      this.ds.itemSize = size;
      this.ds.fetch(true);
    }
  }

  preview(data: AnyDto<Media>): void {
    this.image.preview([
      {
        src: `${this.wpx.assets}/${data.url}/default`,
        alt: data.name
      }
    ]);
  }

  delete(data: AnyDto<Media>): void {
    this.media.delete(data._id).subscribe(() => {
      this.message.success('数据删除完成');
      this.ds.fetch(true);
    });
  }
}
