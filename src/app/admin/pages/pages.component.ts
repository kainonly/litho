import { Component, OnInit } from '@angular/core';

import { TreeNodesExpanded } from '@weplanx/components';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Page } from './dto/page';
import { FormComponent } from './form/form.component';
import { PagesSerivce } from './pages.serivce';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];

  constructor(private pages: PagesSerivce, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.pages.api.find<Page>().subscribe(result => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of result) {
        dict[x._id] = {
          title: `${x.name}`,
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

  expanded(nodes: NzTreeNode[], value: boolean): void {
    TreeNodesExpanded(nodes, value);
  }

  fetchData($event: NzFormatEmitEvent) {
    console.log($event.node);
  }

  form(editable?: any) {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        editable,
        nodes: this.nodes
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}
