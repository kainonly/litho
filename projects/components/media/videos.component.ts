import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxMedia } from './media';

@Component({
  selector: 'wpx-media-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./media.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxMediaVideosComponent),
      multi: true
    }
  ]
})
export class WpxMediaVideosComponent extends WpxMedia {}
