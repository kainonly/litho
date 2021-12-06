import { Component, OnInit } from '@angular/core';

import { Page } from '@weplanx/components';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { PagesSerivce } from './pages.serivce';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];

  constructor(private page: PagesSerivce) {}

  ngOnInit(): void {
    this.getPages();
  }

  private getPages(): void {
    this.page.api.find<Page>().subscribe(result => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of result) {
        dict[x._id] = {
          title: `${x.name} [ ${x.fragment} ]`,
          key: x._id,
          parent: x.parent,
          icon: x.icon,
          isLeaf: true,
          expanded: true,
          data: x
        };
      }
      for (const x of result) {
        const options = dict[x._id];
        if (x.parent === 'root') {
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

  fetchData($event: NzFormatEmitEvent) {}
}
