import { Component, OnInit } from '@angular/core';

import { WpxPageNode } from '@weplanx/ngx/layout';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { WpxPageSerivce } from './wpx-page.serivce';

@Component({
  selector: 'wpx-page',
  templateUrl: './wpx-page.component.html'
})
export class WpxPageComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];

  constructor(private page: WpxPageSerivce) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.page.api.find().subscribe((data: any) => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data as WpxPageNode[]) {
        dict[x.id] = {
          title: `${x.name} [${x.fragment}]`,
          key: x.id,
          parent: x.parent,
          icon: x.icon,
          isLeaf: true,
          expanded: true,
          originData: x
        };
      }
      for (const x of data as WpxPageNode[]) {
        const options = dict[x.id];
        if (x.parent === 0) {
          nodes.push(options);
        } else {
          if (dict.hasOwnProperty(x.parent)) {
            if (!dict[x.parent].hasOwnProperty('children')) {
              dict[x.parent].children = [];
            }
            dict[x.parent].children!.push(options);
            dict[x.parent].isLeaf = false;
          }
        }
      }
      this.nodes = [...nodes];
    });
  }

  fetch(e: NzFormatEmitEvent) {}

  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    for (const node of nodes) {
      node.isExpanded = value;
      if (node.children.length !== 0) {
        this.setExpanded(node.children, value);
      }
    }
  }
}
