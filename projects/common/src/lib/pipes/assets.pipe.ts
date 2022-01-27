import { Pipe, PipeTransform } from '@angular/core';

import { AssetsOption } from '../types';
import { WpxService } from '../wpx.service';

@Pipe({ name: 'wpxAssets' })
export class WpxAssetsPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(values: string[], option?: AssetsOption): string {
    if (values.length === 0) {
      return '';
    }
    const url = new URL([this.wpx.assets, ...values].join('/'));
    if (option?.params) {
      for (const [name, value] of Object.entries(option.params)) {
        url.searchParams.append(name, value);
      }
    }
    if (option?.css) {
      return `url("${url.toString()}")`;
    }
    return url.toString();
  }
}
