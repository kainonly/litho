import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';

import { WpxMedia } from './media';
import { WpxMediaViewComponent } from './view/view.component';

@Component({
  selector: 'wpx-media-pictures',
  templateUrl: './pictures.component.html',
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
  constructor(private modal: NzModalService) {
    super();
  }

  view(): void {
    this.modal.create({
      nzWidth: 960,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: 'pictures',
        wpxFallback: '',
        wpxHeight: '600px'
      }
    });
  }
}
