import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { asyncValidator, TreeNodesExpanded } from '@weplanx/components';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Field } from './dto/field';
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
  actionNode?: NzTreeNodeOptions;
  selectedNode?: NzTreeNodeOptions;
  fields: Field[] = [];

  constructor(
    private pages: PagesSerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getData();
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
          selectable: x.kind !== 'group',
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

  selected($event: NzFormatEmitEvent): void {
    if ($event.node?.origin.data.kind === 'group') {
      return;
    }
    if ($event.node?.isSelected) {
      this.selectedNode = $event.node;
      this.fields = [...$event.node?.origin.data.schema.fields];
    } else {
      this.selectedNode = undefined;
      this.fields = [];
    }
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actionNode = $event.node!;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  delete(data: any): void {
    console.log(data);
    // this.schema.removeField(this.data!._id, data.key).subscribe(v => {
    //   if (v.code === 0) {
    //     this.notification.success('操作成功', '内容类型更新完成');
    //     this.ok.emit(v);
    //   } else {
    //     this.notification.error('操作失败', v.message);
    //   }
    // });
  }
}
