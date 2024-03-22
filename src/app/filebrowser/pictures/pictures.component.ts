import { Component } from '@angular/core';

import { PicturesService } from '@common/services/pictures.service';
import { ShareModule } from '@common/share.module';
import { WpxFilebrowserModule } from '@weplanx/ng/filebrowser';

@Component({
  standalone: true,
  imports: [ShareModule, WpxFilebrowserModule],
  selector: 'app-filebrowser-pictures',
  template: `
    <wpx-filebrowser
      [wpxApi]="pictures"
      [wpxType]="'picture'"
      [wpxFallback]="['assets', 'photon.svg'] | wpxAssets"
    ></wpx-filebrowser>
  `
})
export class PicturesComponent {
  constructor(public pictures: PicturesService) {}
}
