import { Pipe, PipeTransform } from '@angular/core';

import { Page } from '@weplanx/common';
import { AnyDto } from '@weplanx/ng';

@Pipe({ name: 'Level' })
export class LevelPipe implements PipeTransform {
  transform(page: AnyDto<Page>): number {
    let level = -1;
    let node = page;
    while (node) {
      level++;
      node = node['parentNode'];
    }
    return level * 24;
  }
}
