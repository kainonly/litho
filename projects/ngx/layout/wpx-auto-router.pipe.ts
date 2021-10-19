import { Pipe, PipeTransform } from '@angular/core';

import { Page } from '@weplanx/ngx/layout';

@Pipe({ name: 'wpxAutoRouter' })
export class WpxAutoRouterPipe implements PipeTransform {
  transform(node: Page): any[] {
    if (node.router !== 'manual') {
      return [node.fragments.join(','), node._id];
    }
    return node.fragments;
  }
}
