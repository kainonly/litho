import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
  view(): void {
    this.modal.create({
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 960,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: 'pictures',
        wpxFallback: this.wpxFallback,
        wpxHeight: '600px'
      },
      nzOnOk: instance => {
        this.values!.push(...instance.ds.getUrls([...instance.ds.checkedIds.values()]));
        this.onChanged(this.values!);
      }
    });
  }
}
