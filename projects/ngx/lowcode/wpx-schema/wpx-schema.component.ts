import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Field } from './field';
import { WpxSchemaService } from './wpx-schema.service';

@Component({
  selector: 'wpx-schema',
  templateUrl: './wpx-schema.component.html',
  styles: [
    `
      ::ng-deep .cdk-drag-preview {
        display: table;
      }

      ::ng-deep .cdk-drag-placeholder {
        opacity: 0;
      }
    `
  ]
})
export class WpxSchemaComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  fields: Field[] = [];

  constructor(private schema: WpxSchemaService, private nzContextMenuService: NzContextMenuService) {}

  ngOnInit(): void {
    this.schema.api.find().subscribe(data => {
      const models: Record<string, NzTreeNodeOptions> = {
        collection: {
          title: '集合类型',
          key: 'collection',
          expanded: true,
          selectable: false,
          children: []
        },
        single: {
          title: '单一类型',
          key: 'single',
          expanded: true,
          selectable: false,
          children: []
        },
        manual: {
          title: '自定义类型',
          key: 'manual',
          expanded: true,
          selectable: false,
          children: []
        }
      };
      for (const x of data) {
        if (models.hasOwnProperty(x.kind)) {
          models[x.kind].children?.push({
            title: `${x.name}[ ${x.collection} ]`,
            key: x.collection,
            icon: !x.system ? '' : 'lock',
            isLeaf: true,
            data: x
          });
        }
      }
      this.nodes = [...Object.values(models)];
    });
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    if (!$event.node?.origin.data) {
      return;
    }
    console.log($event.node);
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  fetch($event: NzFormatEmitEvent) {
    if (!$event.node?.origin.data) {
      return;
    }
    console.log($event.node);
    if (!$event.node.origin.data.fields) {
      this.fields = [];
    } else {
      this.fields = [...$event.node.origin.data.fields];
    }
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
  }

  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    for (const node of nodes) {
      node.isExpanded = value;
      if (node.children.length !== 0) {
        this.setExpanded(node.children, value);
      }
    }
  }
}
