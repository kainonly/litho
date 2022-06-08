import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';

import { AnyDto, expandTreeNodes } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DepartmentsService } from './departments.service';
import { FormComponent } from './form/form.component';
import { Department } from './types';

@Component({
  selector: 'wpx-admin-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  /**
   * 部门 ID
   */
  @Input() id!: string;
  /**
   * 部门 ID 变更
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
   * 搜索
   */
  searchText = '';
  /**
   * 展开状态
   */
  expand = true;
  /**
   * 操作 ID
   */
  actionId?: string;
  /**
   * 选中状态
   */
  selectedKeys: string[] = [];
  /**
   * 重组树视图
   */
  reorganizationVisible: boolean = false;
  /**
   * 重组节点
   */
  reorganizationNodes: NzTreeNodeOptions[] = [];

  constructor(
    public departments: DepartmentsService,
    private modal: NzModalService,
    private nzContextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.departments.getTreeNode().subscribe(v => {
      this.nodes = [{ title: `全部`, key: 'root', expanded: true, selectable: false, children: v }];
      this.selectedKeys = [this.id === '' ? 'root' : this.id];
    });
  }

  /**
   * 切换展开状态
   */
  expanded(): void {
    this.expand = !this.expand;
    expandTreeNodes(this.tree.getTreeNodes(), this.expand);
  }

  /**
   * 选中
   * @param e
   */
  selected(e: NzFormatEmitEvent): void {
    if (!e.node || e.node.isSelected) {
      return;
    }
    e.node.isSelected = !e.node.isSelected;
    if (e.node.key === 'root') {
      this.id = '';
    } else {
      this.id = e.node.key;
    }
    this.idChange.next(this.id);
  }

  /**
   * 操作
   * @param $event
   * @param menu
   */
  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actionId = $event.node!.key;
    this.nzContextMenu.create($event.event as MouseEvent, menu);
  }

  /**
   * 打开表单
   * @param doc
   * @param parent
   */
  form(doc?: any, parent?: string): void {
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
   * 删除部门
   * @param doc
   */
  delete(doc: AnyDto<Department>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】部门吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.departments.delete(doc._id).subscribe(() => {
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
   * 拖拽重组
   * @param event
   */
  reorganization(event: NzFormatEmitEvent): void {
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
    this.departments
      .reorganization(node.key, parent)
      .pipe(mergeMap(() => this.departments.sort(sort)))
      .subscribe(v => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
