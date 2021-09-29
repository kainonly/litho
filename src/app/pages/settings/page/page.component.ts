import { Component, OnInit } from '@angular/core';

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { PageStruct } from 'ngx-bit/router';

import { PageService } from './page.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  tabIndex = 0;
  schema: any[] = [{ type: 'string', field: 'name' }];
  data?: Record<string, any>;

  constructor(private page: PageService) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.page.api.find().subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data as PageStruct[]) {
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
      for (const x of data as PageStruct[]) {
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

  fetch(e: NzFormatEmitEvent) {
    if (e.keys?.length !== 0) {
      this.data = e.node?.origin.originData;
      this.tabIndex = 1;
    } else {
      this.data = undefined;
      this.tabIndex = 0;
    }
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
