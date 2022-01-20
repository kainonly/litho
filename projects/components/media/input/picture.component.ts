import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Common } from './common';

@Component({
  selector: 'wpx-media-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./common.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxMediaPictureComponent),
      multi: true
    }
  ]
})
export class WpxMediaPictureComponent extends Common {}
