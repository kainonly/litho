import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxMedia } from './media';

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
export class WpxMediaPicturesComponent extends WpxMedia {}
