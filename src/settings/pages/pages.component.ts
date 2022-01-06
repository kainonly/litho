import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AnyDto, Page, TreeNodesExpanded } from '@weplanx/common';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FormComponent } from './form/form.component';
import { PagesSerivce } from './pages.serivce';

@Component({
  selector: 'settings-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  @ViewChild('tree') tree!: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [];
  name = '';
  expand = true;

  data: Record<string, AnyDto<Page>> = {};
  actionKey?: string;
  selectedKeys: string[] = [];

  constructor(
    public pages: PagesSerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
    this.pages.key$.subscribe(key => {
      if (key) {
        this.selectedKeys = [key];
      }
    });
  }

  getData(): void {
    this.pages.find({}, { sort: 1 }).subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data) {
        this.data[x._id] = x;
        dict[x._id] = {
          title: `${x.name}`,
          key: x._id,
          parent: x.parent,
          icon: x.icon,
          isLeaf: true,
          expanded: true,
          selectable: x.kind !== 'group'
        };
      }
      for (const x of data) {
        const options = dict[x._id];
        if (!x.parent) {
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
      this.pages.key$.complete();
    });
  }

  expanded(): void {
    this.expand = !this.expand;
    TreeNodesExpanded(this.tree.getTreeNodes(), this.expand);
  }

  selected($event: NzFormatEmitEvent): void {
    if (!$event.node?.isSelectable) {
      return;
    }
    if ($event.node?.isSelected) {
      this.router.navigate(['settings', 'pages', $event.node!.key, 'schema']);
    } else {
      this.router.navigate(['settings', 'pages', 'home']);
    }
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actionKey = $event.node!.key;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  form(editable?: any): void {
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

  delete(data: AnyDto<Page>): void {
    this.modal.confirm({
      nzTitle: '您确定要作废该页面吗?',
      nzContent: '该操作不会真实删除实体集合，如必须删除需要数据库工具控制完成',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.pages.delete(data._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.getData();
        });
      },
      nzCancelText: '再想想'
    });
  }

  drop(event: NzFormatEmitEvent): void {
    if (!event.dragNode) {
      return;
    }
    const node = event.dragNode;
    const parentNode = node.getParentNode();
    let parent: string;
    let sort: string[];
    if (!parentNode) {
      parent = 'root';
      sort = node.treeService!.rootNodes.map(v => v.key);
    } else {
      parent = parentNode.key;
      sort = parentNode.children.map(v => v.key);
    }
    this.pages.reorganization(node.key, parent).subscribe(v => {
      this.message.success('数据更新完成');
      this.getData();
    });
  }
}
