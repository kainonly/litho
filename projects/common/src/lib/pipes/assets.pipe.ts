import { Pipe, PipeTransform } from '@angular/core';

import { AssetsOption, WpxService } from '@weplanx/common';

@Pipe({ name: 'wpxAssets' })
export class WpxAssetsPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(values: string[], option?: AssetsOption): string {
    let url = [this.wpx.assets, ...values].join('/');
    if (option?.compress) {
      switch (this.wpx.upload?.storage) {
        case 'cos':
          url += '?imageMogr2/format/avif/quality/80';
          break;
      }
    }
    if (option?.thumbnail) {
      switch (this.wpx.upload?.storage) {
        case 'oss':
          url += '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_200,limit_0/quality,q_90/format,webp';
          break;
        case 'cos':
          url += '?imageMogr2/format/avif/quality/10/blur/10x8';
          break;
      }
    }
    if (option?.css) {
      url = `url("${url}")`;
    }
    return url;
  }
}
