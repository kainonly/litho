import { Component, Inject } from '@angular/core';

import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

export interface ViewVideoData {
  url: string;
}

@Component({
  selector: 'wpx-media-view-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  constructor(@Inject(NZ_MODAL_DATA) public data: ViewVideoData) {}
}
