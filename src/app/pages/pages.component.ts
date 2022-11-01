import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';

import { AppService } from '@app';
import { AnyDto, Page } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

import { FormComponent } from './form/form.component';
import { PagesService } from './pages.service';
import { PageFlatNode, PageNode } from './types';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  /**
   * 树视图控制
   */
  control = new FlatTreeControl<PageFlatNode>(
    node => node.level,
    node => node.expandable
  );
  /**
   * 选择模型
   */
  selection = new SelectionModel<PageFlatNode>();
  /**
   * 数据源
   */
  ds = new NzTreeFlatDataSource(
    this.control,
    new NzTreeFlattener(
      (node: PageNode, level: number): PageFlatNode => ({
        ...node,
        expandable: !!node.children && node.children.length > 0,
        level,
        disabled: !!node.disabled
      }),
      node => node.level,
      node => node.expandable,
      node => node.children
    )
  );
  /**
   * 搜索文本
   * @deprecated
   */
  searchText = '';
  /**
   * 操作选中节点
   */
  actionNode?: PageFlatNode;
  /**
   * 重组树视图
   */
  reorganizationVisible = false;
  /**
   * 重组节点
   */
  reorganizationNodes: NzTreeNodeOptions[] = [];

  constructor(
    public app: AppService,
    public pages: PagesService,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  hasChild = (_: number, node: PageFlatNode): boolean => node.expandable;

  /**
   * 获取数据
   */
  getData(): void {
    this.pages.getNodes().subscribe(v => {
      this.ds.setData(v);
    });
  }

  /**
   * 选择
   */
  selected(node: PageFlatNode): void {
    if (node.kind === 'group') {
      return;
    }
    this.selection.toggle(node);
  }

  /**
   * 操作
   * @param $event
   * @param menu
   * @param node
   */
  nodeActions($event: MouseEvent, menu: NzDropdownMenuComponent, node: PageFlatNode): void {
    this.actionNode = node;
    this.nzContextMenuService.create($event, menu);
  }

  /**
   * 打开表单
   * @param doc
   * @param parent
   */
  form(doc?: AnyDto<Page>, parent?: string): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzComponentParams: {
        doc,
        parent
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 删除
   * @param data
   */
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

  /**
   * 开启重组
   */
  openReorganization(): void {
    this.reorganizationVisible = true;
    this.reorganizationNodes = this.formatReorganizationNodes([]);
  }

  /**
   * 禁止选中
   * @param nodes
   */
  formatReorganizationNodes(nodes: NzTreeNodeOptions[]): NzTreeNodeOptions[] {
    return nodes.map(v => {
      if (v.children) {
        this.formatReorganizationNodes(v.children);
      }
      v.selectable = false;
      v.selected = false;
      return v;
    });
  }

  /**
   * 关闭重组
   */
  closeReorganization(): void {
    this.reorganizationVisible = false;
  }

  /**
   * 排序重组
   * @param event
   */
  reorganization(event: NzFormatEmitEvent): void {
    if (!event.dragNode) {
      return;
    }
    const node = event.dragNode;
    const parentNode = node.getParentNode();
    let parent: any = null;
    let sort: string[];
    if (!parentNode) {
      sort = node.treeService!.rootNodes.map(v => v.key);
    } else {
      parent = parentNode.key;
      sort = parentNode.children.map(v => v.key);
    }
    this.pages
      .reorganization(node.key, parent)
      .pipe(mergeMap(() => this.pages.sort(sort)))
      .subscribe(() => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
