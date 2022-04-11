import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';

import { AnyDto, expandTreeNodes } from '@weplanx/common';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DepartmentsService } from './departments.service';
import { FormComponent } from './form/form.component';
import { Department } from './types';

@Component({
  selector: 'wpx-settings-departments',
  templateUrl: './departments.component.html'
})
export class DepartmentsComponent implements OnInit {
  @ViewChild('tree') tree!: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [];
  searchText = '';
  expand = true;
  actionKey?: string;
  selectedKeys: string[] = [];

  @Input() id!: string;
  @Output() readonly idChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public departments: DepartmentsService,
    private modal: NzModalService,
    private nzContextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.departments.getTreeNode().subscribe(v => {
      this.nodes = [{ title: `全部`, key: 'root', expanded: true, selectable: false, children: v }];
      this.selectedKeys = [this.id === '' ? 'root' : this.id];
    });
  }

  expanded(): void {
    this.expand = !this.expand;
    expandTreeNodes(this.tree.getTreeNodes(), this.expand);
  }

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

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actionKey = $event.node!.key;
    this.nzContextMenu.create($event.event as MouseEvent, menu);
  }

  form(doc?: any, parent?: string): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzComponentParams: {
        doc,
        nodes: this.nodes[0].children,
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
   * 拖拽重组
   * @param event
   */
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
    this.departments
      .reorganization(node.key, parent)
      .pipe(mergeMap(() => this.departments.sort(sort)))
      .subscribe(v => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
