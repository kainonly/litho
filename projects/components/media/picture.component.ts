import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MediaInput } from './media-input';

@Component({
  selector: 'wpx-media-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./media.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxPictureComponent),
      multi: true
    }
  ]
})
export class WpxPictureComponent extends MediaInput {}
