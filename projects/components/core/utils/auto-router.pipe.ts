import { Pipe, PipeTransform } from '@angular/core';

import { Page } from '../types';

@Pipe({ name: 'AutoRouter' })
export class AutoRouterPipe implements PipeTransform {
  transform(node: Page): any[] {
    if (node.router !== 'manual') {
      return [node.fragments.join(',')];
    }
    return node.fragments;
  }
}
