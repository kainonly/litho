import { Pipe, PipeTransform } from '@angular/core';

import { AssetsOption, WpxService } from '@weplanx/common';

@Pipe({ name: 'wpxAssets' })
export class WpxAssetsPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(values: string[], option?: AssetsOption): string {
    if (values.length === 0) {
      return '';
    }
    let url = [this.wpx.assets, ...values].join('/');
    if (option?.css) {
      url = `url("${url}")`;
    }
    return url;
  }
}
