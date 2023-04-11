import { Component } from '@angular/core';

import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-design-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.scss']
})
export class OutlineComponent {
  activatedNode?: NzTreeNode;
  nodes = [
    {
      title: '商品管理',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        { title: '商品列表', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: '商品分类', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: '数据报表',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: '账单流水报表', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: '渠道统计', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];

  constructor(private contextMenuService: NzContextMenuService) {}

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.contextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
