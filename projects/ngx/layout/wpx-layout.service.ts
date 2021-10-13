import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NzTreeNode } from 'ng-zorro-antd/tree';

import { WpxPageNodes } from './types';

@Injectable({
  providedIn: 'root'
})
export class WpxLayoutService {
  readonly pages: BehaviorSubject<WpxPageNodes> = new BehaviorSubject<WpxPageNodes>(<WpxPageNodes>{});
  activated: string[] = [];
  skip = false;
  back = false;
  title?: string;
  subTitle?: string;
  alert?: TemplateRef<unknown>;
  tags?: TemplateRef<unknown>;
  actions?: QueryList<TemplateRef<unknown>>;
  content?: TemplateRef<unknown>;
  footer?: TemplateRef<unknown>;

  reset(): void {
    this.skip = false;
    this.back = false;
    this.title = undefined;
    this.subTitle = undefined;
    this.alert = undefined;
    this.tags = undefined;
    this.actions = undefined;
    this.content = undefined;
    this.footer = undefined;
  }

  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    for (const node of nodes) {
      node.isExpanded = value;
      if (node.children.length !== 0) {
        this.setExpanded(node.children, value);
      }
    }
  }
}
