import { Component, OnInit, ViewChild } from '@angular/core';

import { WpxLayoutService } from '@weplanx/ngx/layout';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Schema } from './types';
import { WpxSchemaFieldActComponent } from './wpx-schema-field-act/wpx-schema-field-act.component';
import { WpxSchemaService } from './wpx-schema.service';

@Component({
  selector: 'wpx-schema',
  templateUrl: './wpx-schema.component.html',
  styleUrls: ['./wpx-schema.component.scss']
})
export class WpxSchemaComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  actionNode?: NzTreeNodeOptions;

  @ViewChild(WpxSchemaFieldActComponent) fieldAct!: WpxSchemaFieldActComponent;

  tabs = 0;
  manuals: Schema[] = [];

  constructor(
    public layout: WpxLayoutService,
    private schema: WpxSchemaService,
    private nzContextMenuService: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getSchemas();
  }

  getSchemas(): void {
    this.schema.api.find<Schema[]>().subscribe(result => {
      const models: Record<string, NzTreeNodeOptions> = {
        home: {
          title: '模式组件',
          key: 'home',
          isLeaf: true,
          selectable: false
        },
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
        }
      };
      const manuals = [];
      for (const x of result) {
        if (x.kind === 'manual') {
          manuals.push(x);
        }
        if (models.hasOwnProperty(x.kind)) {
          models[x.kind].children?.push({
            title: `${x.label} [ ${x.key} ]`,
            key: x.key,
            isLeaf: true,
            data: x
          });
        }
        if (this.fieldAct.data?._id === x._id) {
          this.fieldAct.setData(x as Schema);
        }
      }
      this.manuals = [...manuals];
      this.nodes = [...Object.values(models)];
    });
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    if ($event.node?.level === 0) {
      return;
    }
    this.actionNode = $event.node!;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  fetchData($event: NzFormatEmitEvent) {
    if ($event.node?.key === 'home') {
      this.fieldAct.resetData();
      for (const x of $event.nodes!) {
        x.isSelected = false;
      }
    }
    this.tabs = 0;
    if ($event.node?.level === 0) {
      return;
    }
    if ($event.node?.isSelected) {
      this.fieldAct.setData($event.node?.origin.data);
    } else {
      this.fieldAct.resetData();
    }
  }
}
