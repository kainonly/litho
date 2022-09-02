import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';

import { AnyDto, expandTreeNodes, Page } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FactorySerivce } from '../factory.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-factory-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
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
   * 操作选中 ID
   */
  actionId?: string;
  /**
   * 重组树视图
   */
  reorganizationVisible: boolean = false;
  /**
   * 重组节点
   */
  reorganizationNodes: NzTreeNodeOptions[] = [];

  constructor(
    public factory: FactorySerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   * @param refresh
   */
  getData(refresh = false): void {
    this.factory
      .getTreeNode({}, (dict, page) => {
        dict[page._id].selectable = page.kind !== 'group';
      })
      .subscribe(data => {
        this.nodes = [...data];
        this.selectedKeys = [this.id];
        if (refresh) {
          this.message.success('刷新完毕~');
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
    this.id = e.node?.isSelected ? e.node.key : '';
    this.idChange.next(this.id);
  }

  /**
   * 操作
   * @param $event
   * @param menu
   */
  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actionId = $event.node!.key;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
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

  /**
   * 开启重组
   */
  openReorganization(): void {
    this.reorganizationVisible = true;
    this.reorganizationNodes = this.formatReorganizationNodes([...this.nodes]);
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
    this.factory
      .reorganization(node.key, parent)
      .pipe(mergeMap(() => this.factory.sort(sort)))
      .subscribe(() => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
