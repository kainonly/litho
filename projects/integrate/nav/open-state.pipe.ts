import { Pipe, PipeTransform } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Pipe({ name: 'OpenState' })
export class OpenStatePipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(id: string, current: string): boolean {
    if (!current) {
      return false;
    }
    let node = this.wpx.pages[current];
    while (node) {
      if (node._id === id) {
        return true;
      }
      node = node['parentNode'];
    }
    return false;
  }
}
