import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MediaInput } from './media-input';

@Component({
  selector: 'wpx-media-video',
  templateUrl: './video.component.html',
  styleUrls: ['./media.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxVideoComponent),
      multi: true
    }
  ]
})
export class WpxVideoComponent extends MediaInput {}
