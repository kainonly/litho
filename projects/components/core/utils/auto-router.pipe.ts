import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'AutoRouter' })
export class AutoRouterPipe implements PipeTransform {
  transform(node: any): any[] {
    if (node.router !== 'manual') {
      return [node.fragments.join(',')];
    }
    return node.fragments;
  }
}
