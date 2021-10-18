import { Pipe, PipeTransform } from '@angular/core';

import { WpxPageNode } from '@weplanx/ngx/layout';

@Pipe({ name: 'wpxAutoRouter' })
export class WpxAutoRouterPipe implements PipeTransform {
  transform(node: WpxPageNode): any[] {
    if (node.router.template !== 'manual') {
      return [
        node.fragments.join(','),
        {
          page: node._id,
          template: node.router.template,
          schema: node.router.schema
        }
      ];
    }
    return node.fragments;
  }
}
