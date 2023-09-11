import { Component, Inject } from '@angular/core';

import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

export interface VideoInput {
  url: string;
}

@Component({
  selector: 'wpx-media-video',
  template: `
    <video style="width: 100%" controls [poster]="[data.url + '_0'] | wpxAssets">
      <source [src]="[data.url] | wpxAssets" />
      <p i18n>
        您的浏览器不支持 HTML5 视频. 请点击
        <a [href]="[data.url] | wpxAssets">视频链接</a> 代替.
      </p>
    </video>
  `
})
export class VideoComponent {
  constructor(@Inject(NZ_MODAL_DATA) public data: VideoInput) {}
}
