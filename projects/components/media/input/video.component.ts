import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Common } from './common';

@Component({
  selector: 'wpx-media-video',
  templateUrl: './video.component.html',
  styleUrls: ['./common.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxMediaVideoComponent),
      multi: true
    }
  ]
})
export class WpxMediaVideoComponent extends Common {}
