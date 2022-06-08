import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FactorySerivce } from '../../../application/factory/factory.serivce';
import { RolesService } from '../roles.service';
import { Role } from '../types';

@Component({
  selector: 'wpx-admin-roles-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc!: AnyDto<Role>;
  /**
   * 树视图
   */
  @ViewChild(NzTreeComponent) tree!: NzTreeComponent;
  /**
   * 树节点
   */
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    public factory: FactorySerivce,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.factory
      .getTreeNode({ status: true }, (dict, page) => {
        dict[page._id].selectable = false;
        if (this.doc.pages.hasOwnProperty(page._id)) {
          dict[page._id].checked = true;
          dict[page._id]['readWrite'] = this.doc.pages[page._id];
        } else {
          dict[page._id]['readWrite'] = 1;
        }
      })
      .subscribe(data => {
        this.nodes = [...data];
      });
  }

  /**
   * 设置展开状态
   * @param data
   */
  expanded(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  /**
   * 切换读写状态
   * @param origin
   */
  switchReadWrite(origin: any): void {
    origin['readWrite'] = origin['readWrite'] === 1 ? 0 : 1;
  }

  /**
   * 切换选择状态
   * @param status
   */
  switchSelected(status: boolean): void {
    const stack = [...this.tree.getTreeNodes()];
    while (stack.length !== 0) {
      const node = stack.pop()!;
      if (node.children.length !== 0) {
        stack.push(...node.children);
      }
      node.isChecked = status;
    }
  }

  /**
   * 关闭设置
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   */
  submit(): void {
    const pages: Record<string, number> = {};
    const stack = [...this.tree.getTreeNodes()];
    while (stack.length !== 0) {
      const node = stack.pop()!;
      if (node.children.length !== 0) {
        stack.push(...node.children);
      }
      if (node.isChecked || node.isHalfChecked) {
        pages[node.key] = node.origin['readWrite'];
      }
    }
    this.roles
      .updateOneById(this.doc._id, {
        $set: { pages }
      })
      .subscribe(() => {
        this.message.success('权限更新完成');
        this.modalRef.triggerOk();
      });
  }
}
