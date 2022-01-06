import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeNodesExpanded } from '@weplanx/common';
import { WpxPagesSerivce } from '@weplanx/settings/pages';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { WpxRolesService } from '../wpx-roles.service';

@Component({
  selector: 'wpx-settings-roles-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  key!: string;

  @ViewChild('tree') tree!: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [];
  name = '';
  expand = true;

  checkedKeys: string[] = [];

  constructor(
    private roles: WpxRolesService,
    private pages: WpxPagesSerivce,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.key = v['key'];
      this.roles.key$.next(v['key']);
      this.getData();
    });
  }

  getData(): void {
    this.roles.findOneById(this.key).subscribe(data => {
      this.getPages(data.pages, data.readonly);
    });
  }

  getPages(pages: string[], readonly: string[]): void {
    this.pages.find({}, { sort: 1 }).subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data) {
        dict[x._id] = {
          title: `${x.name}`,
          key: x._id,
          parent: x.parent,
          isLeaf: true,
          expanded: true,
          selectable: false
        };
        if (pages.length !== 0 && x.kind === 'group') {
          const index = pages.indexOf(x._id);
          if (index !== -1) {
            pages.splice(index, 1);
          }
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
      this.checkedKeys = [...pages];
    });
  }

  expanded(): void {
    this.expand = !this.expand;
    TreeNodesExpanded(this.tree.getTreeNodes(), this.expand);
  }

  submit(): void {
    const values: string[] = [];
    const stack: NzTreeNode[] = [...this.tree.getTreeNodes()];
    while (stack.length !== 0) {
      const node = stack.pop();
      if (!node) {
        break;
      }
      if (node.children.length !== 0) {
        stack.push(...node.children);
      }
      if (node.isChecked || node.isHalfChecked) {
        values.push(node.key);
      }
    }
    this.roles
      .updateOneById(
        this.key,
        {
          update: {
            $set: {
              pages: values
            }
          }
        }
        // ['pages']
      )
      .subscribe(v => {
        this.message.success('权限已更新');
      });
  }
}
