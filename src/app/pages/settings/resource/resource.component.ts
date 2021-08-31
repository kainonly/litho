import { Component, OnInit } from '@angular/core';

import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { ResourceStruct } from 'ngx-bit/router';

import { ResourceService } from './resource.service';

@Component({
  selector: 'app-settings-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];

  constructor(private resource: ResourceService) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.resource.crud.originLists().subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data as ResourceStruct[]) {
        dict[x.path] = {
          title: `${x.name}`,
          key: x.path,
          parent: x.parent,
          isLeaf: true,
          expanded: true,
          originData: x
        };
      }
      for (const x of data as ResourceStruct[]) {
        const options = dict[x.path];
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
}
