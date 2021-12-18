import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TreeNodesExpanded } from '@weplanx/components';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Page } from './dto/page';
import { FormComponent } from './form/form.component';
import { PagesSerivce } from './pages.serivce';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  @ViewChild('tree') tree!: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [];
  name = '';

  data: Record<string, Page> = {};
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
    this.pages.api.find<Page>({}, { sort: 1 }).subscribe(result => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of result) {
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
      for (const x of result) {
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

  expanded(nodes: NzTreeNode[], value: boolean): void {
    TreeNodesExpanded(nodes, value);
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

  delete(data: Page): void {
    this.modal.confirm({
      nzTitle: '您确定要作废该页面吗?',
      nzContent: '该操作不会真实删除实体集合，如必须删除需要数据库工具控制完成',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.pages.api.deleteById([data._id]).subscribe(v => {
          if (!v.code) {
            this.message.success('数据删除完成');
            this.getData();
          } else {
            this.notification.error('操作失败', v.message);
          }
        });
      },
      nzCancelText: '再想想'
    });
  }

  drop(event: NzFormatEmitEvent) {
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
    this.pages.reorganization(node.key, parent, sort).subscribe(v => {
      if (!v.code) {
        this.message.success('数据更新完成');
        this.getData();
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
