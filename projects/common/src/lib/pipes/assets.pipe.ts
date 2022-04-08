import { Pipe, PipeTransform } from '@angular/core';

import { WpxService } from '../wpx.service';

@Pipe({ name: 'wpxAssets' })
export class WpxAssetsPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  /**
   * TODO:改造多参数
   * @param values
   * @param option
   */
  transform(
    values: string[],
    option?: {
      params?: Record<string, string>;
      css?: boolean;
    }
  ): string {
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
