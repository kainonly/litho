import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';

import { AnyDto, expandTreeNodes, Page } from '@weplanx/common';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FormComponent } from './form/form.component';
import { PagesSerivce } from './pages.serivce';

@Component({
  selector: 'wpx-resources-factory-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('tree') tree!: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [];
  name = '';
  expand = true;

  actionKey?: string;
  selectedKeys: string[] = [];

  constructor(
    public pages: PagesSerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.firstChild!.params.subscribe(v => {
      this.pages.key = v['key'];
      this.getData();
    });
  }

  getData(): void {
    this.pages.getTreeNode({}).subscribe(v => {
      this.nodes = [...v];
      if (this.pages.key) {
        this.selectedKeys = [this.pages.key];
      }
    });
  }

  /**
   * 展开状态
   */
  expanded(): void {
    this.expand = !this.expand;
    expandTreeNodes(this.tree.getTreeNodes(), this.expand);
  }

  /**
   * 选择
   * @param e
   */
  selected(e: NzFormatEmitEvent): void {
    if (!e.node?.isSelectable) {
      return;
    }
    if (e.node?.isSelected) {
      this.pages.key = e.node!.key;
      this.router.navigate(['resources', 'factory', 'pages', e.node!.key, 'schema']);
    } else {
      this.pages.key = undefined;
      this.router.navigate(['resources', 'factory', 'pages', 'home']);
    }
  }

  /**
   * 操作
   * @param $event
   * @param menu
   */
  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actionKey = $event.node!.key;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  form(doc?: AnyDto<Page>): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzComponentParams: {
        doc,
        nodes: this.nodes
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(data: AnyDto<Page>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${data.name}】页面吗?`,
      nzContent: '该操作不会删除实体集合，彻底清空需要数据库工具完成',
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
      parent = '';
      sort = node.treeService!.rootNodes.map(v => v.key);
    } else {
      parent = parentNode.key;
      sort = parentNode.children.map(v => v.key);
    }
    this.pages
      .reorganization(node.key, parent)
      .pipe(mergeMap(() => this.pages.sort(sort)))
      .subscribe(v => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
