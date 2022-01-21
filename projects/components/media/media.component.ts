import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/common';
import { NzImageService } from 'ng-zorro-antd/image';

import { MediaDataSource } from './media.data-source';
import { MediaService } from './media.service';
import { Media } from './types';

@Component({
  selector: 'wpx-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class WpxMediaComponent implements OnInit, AfterViewInit {
  @Input() type!: string;
  @Input() fallback?: string;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private resizeObserver!: ResizeObserver;

  ds!: MediaDataSource;

  constructor(private wpx: WpxService, private media: MediaService, private image: NzImageService) {
    this.ds = new MediaDataSource(media);
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
      this.ds.fetch();
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
}
