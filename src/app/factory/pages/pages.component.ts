import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AnyDto, expandTreeNodes, FlatNode, Page } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

import { FactorySerivce } from '../factory.service';
import { FormComponent } from './form/form.component';
import { PageFlatNode, PageNode } from './types';

@Component({
  selector: 'app-factory-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  private transformer = (node: PageNode, level: number): PageFlatNode => ({
    ...node,
    expandable: !!node.children && node.children.length > 0,
    level,
    disabled: !!node.disabled
  });
  selectListSelection = new SelectionModel<PageFlatNode>();
  treeControl = new FlatTreeControl<PageFlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  /**
   * 页面 ID
   */
  @Input() id!: string;
  /**
   * 页面 ID 变更
   */
  @Output() readonly idChange: EventEmitter<string> = new EventEmitter<string>();
  /**
   * 树视图
   */
  @ViewChild('tree') tree!: NzTreeComponent;
  /**
   * 树视图节点
   */
  nodes: NzTreeNodeOptions[] = [];
  /**
   * 初始选中节点
   */
  selectedKeys: string[] = [];
  /**
   * 搜索文本
   */
  searchText = '';
  /**
   * 展开状态
   */
  expand = true;
  /**
   * 操作选中节点
   */
  actionNode?: PageFlatNode;

  constructor(
    public factory: FactorySerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService
  ) {}

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.factory.getPageNodes().subscribe(v => {
      this.dataSource.setData(v);
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
    this.id = e.node?.isSelected ? e.node.key : '';
    this.idChange.next(this.id);
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
        this.factory.delete(data._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.getData();
        });
      },
      nzCancelText: '再想想'
    });
  }
}
