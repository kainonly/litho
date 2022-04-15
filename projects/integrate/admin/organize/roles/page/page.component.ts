import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AnyDto, Page } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { PagesSerivce } from '../../../application/factory/pages.serivce';
import { RolesService } from '../roles.service';
import { Role } from '../types';

@Component({
  selector: 'wpx-admin-roles-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input() doc!: AnyDto<Role>;
  @ViewChild(NzTreeComponent) tree!: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [];
  data: Record<string, AnyDto<Page>> = {};
  checked: string[] = [];

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private pages: PagesSerivce,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.pages.find({ status: true }, { sort: { sort: 1 } }).subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      const checked: string[] = [];
      for (const x of data) {
        dict[x._id] = {
          title: `${x.name}`,
          key: x._id,
          parent: x.parent,
          icon: x.icon,
          isLeaf: true,
          expanded: true,
          selectable: false,
          readonly: this.doc.readonly?.includes(x._id)
        };
        this.data[x._id] = x;
        if (x.kind !== 'group' && this.doc.pages?.includes(x._id)) {
          checked.push(x._id);
        }
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
      this.checked = [...checked];
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

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(): void {
    const pages = [];
    const readonly = [];
    const stack = [...this.tree.getTreeNodes()];
    while (stack.length !== 0) {
      const node = stack.pop()!;
      if (node.children.length !== 0) {
        stack.push(...node.children);
      }
      if (node.isChecked || node.isHalfChecked) {
        pages.push(node.key);
        if (node.origin['readonly']) {
          readonly.push(node.key);
        }
      }
    }
    this.roles
      .updateOneById(
        this.doc._id,
        {
          $set: { pages, readonly }
        },
        {
          format_doc: {
            pages: 'oids',
            readonly: 'oids'
          }
        }
      )
      .subscribe(() => {
        this.message.success('权限更新完成');
        this.modalRef.triggerOk();
      });
  }
}
