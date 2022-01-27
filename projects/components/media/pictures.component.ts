import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';

import { WpxMedia } from './media';
import { WpxMediaViewComponent } from './view/view.component';

@Component({
  selector: 'wpx-media-pictures',
  template: `
    <nz-space>
      <button *nzSpaceItem type="button" nz-button (click)="view()">
        <i nz-icon nzType="import"></i>
        导入图片
      </button>
      <button *nzSpaceItem type="button" nz-button nzType="link">
        <i nz-icon nzType="sort-descending"></i>
        显示排序
      </button>
    </nz-space>
  `,
  styleUrls: ['./media.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxMediaPicturesComponent),
      multi: true
    }
  ]
})
export class WpxMediaPicturesComponent extends WpxMedia {
  @Input() wpxFallback!: string;

  constructor(private modal: NzModalService) {
    super();
  }

  view(): void {
    this.modal.create({
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 960,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: 'pictures',
        wpxFallback: this.wpxFallback,
        wpxHeight: '600px'
      }
    });
  }
}
