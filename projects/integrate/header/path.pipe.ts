import { Pipe, PipeTransform } from '@angular/core';

import { AnyDto, Page, WpxService } from '@weplanx/ng';

@Pipe({ name: 'Path' })
export class PathPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(current: string): Array<AnyDto<Page>> {
    if (!current) {
      return [];
    }
    const path = [];
    let node = this.wpx.pages[current];
    while (node) {
      path.push(node);
      node = node['parentNode'];
    }
    console.log(path);
    return path;
  }
}
