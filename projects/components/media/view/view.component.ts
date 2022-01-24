import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { AnyDto, WpxService } from '@weplanx/common';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { MediaService } from '../media.service';
import { Media } from '../types';
import { FormComponent } from './form/form.component';
import { SettingComponent } from './setting/setting.component';
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
    private message: NzMessageService,
    private modal: NzModalService
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
    const url = new URL(`${this.wpx.assets}/${data.url}/default`);
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

  form(editable: AnyDto<Media>): void {
    this.modal.create({
      nzTitle: '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        editable
      }
    });
  }

  detail(data: AnyDto<Media>): void {
    this.modal.create({
      nzTitle: data.name,
      nzWidth: 960,
      nzContent: SettingComponent,
      nzComponentParams: {
        data,
        fallback: this.fallback
      }
    });
  }

  delete(data: AnyDto<Media>): void {
    this.media.delete(data._id).subscribe(() => {
      this.message.success('数据删除完成');
      this.ds.fetch(true);
    });
  }
}
