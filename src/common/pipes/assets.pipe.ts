import { Pipe, PipeTransform } from '@angular/core';

import { AppService } from '@app';

@Pipe({
  standalone: true,
  name: 'appAssets'
})
export class AssetsPipe implements PipeTransform {
  constructor(private app: AppService) {}

  transform(values: string[], query?: string, css?: boolean): string {
    if (values.length === 0) {
      return '';
    }
    let url = [this.app.assets, ...values].join('/');
    if (query) {
      if (url.includes('?')) {
        url += query;
      } else {
        url = `${url}?${query}`;
      }
    }
    return !css ? url : `url("${url}")`;
  }
}
