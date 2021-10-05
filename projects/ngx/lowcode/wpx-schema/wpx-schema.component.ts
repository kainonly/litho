import { Component, OnInit } from '@angular/core';

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { WpxSchemaService } from './wpx-schema.service';

@Component({
  selector: 'wpx-schema',
  templateUrl: './wpx-schema.component.html'
})
export class WpxSchemaComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];

  constructor(private schema: WpxSchemaService) {}

  ngOnInit(): void {
    this.schema.api.find().subscribe(data => {
      const models: Record<string, NzTreeNodeOptions> = {
        collection: {
          title: '集合类型',
          key: 'collection',
          children: []
        },
        single: {
          title: '单一类型',
          key: 'single',
          children: []
        },
        manual: {
          title: '自定义类型',
          key: 'manual',
          children: []
        }
      };
      for (const x of data) {
        if (models.hasOwnProperty(x.kind)) {
          models[x.kind].children?.push({
            title: x.model,
            key: x.model
          });
        }
      }
      console.log(data);
      this.nodes = [...Object.values(models)];
    });
  }

  fetch(e: NzFormatEmitEvent) {}

  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    for (const node of nodes) {
      node.isExpanded = value;
      if (node.children.length !== 0) {
        this.setExpanded(node.children, value);
      }
    }
  }
}
