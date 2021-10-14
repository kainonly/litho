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
      for (const x of result) {
        if (models.hasOwnProperty(x.kind)) {
          models[x.kind].children?.push({
            title: `${x.label} [ ${x.key} ]`,
            key: x.key,
            icon: !x.system ? '' : 'lock',
            isLeaf: true,
            data: x
          });
        }
        if (this.fieldAct.data?._id === x._id) {
          this.fieldAct.setData(x as Schema);
        }
      }
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
