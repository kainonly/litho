import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxLayoutService, WpxPageNode } from '@weplanx/ngx/layout';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { WpxPageSerivce } from './wpx-page.serivce';

@Component({
  selector: 'wpx-page',
  templateUrl: './wpx-page.component.html'
})
export class WpxPageComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  form?: FormGroup;

  constructor(public layout: WpxLayoutService, private page: WpxPageSerivce, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.page.api.find().subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data as WpxPageNode[]) {
        dict[x._id] = {
          title: `${x.name} [${x.fragment}]`,
          key: x._id,
          parent: x.parent,
          icon: x.icon,
          isLeaf: true,
          expanded: true,
          data: x
        };
      }
      for (const x of data as WpxPageNode[]) {
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

  fetchData($event: NzFormatEmitEvent) {
    console.log($event.node?.origin.data);
    this.form = this.fb.group({});
  }
}
