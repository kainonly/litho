import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { WpxLayoutService, WpxPageNode } from '@weplanx/ngx/layout';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Field, Schema } from '../wpx-schema/types';
import { WpxSchemaService } from '../wpx-schema/wpx-schema.service';
import { WpxPageSerivce } from './wpx-page.serivce';

@Component({
  selector: 'wpx-page',
  templateUrl: './wpx-page.component.html'
})
export class WpxPageComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  schemas: Schema[] = [];

  tabs = 1;
  form?: FormGroup;
  test: any[] = [];

  constructor(
    public layout: WpxLayoutService,
    private page: WpxPageSerivce,
    private schema: WpxSchemaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPages();
    this.getSchemas();
    this.form = this.fb.group({
      name: [],
      parent: [],
      fragment: [],
      router: this.fb.group({
        template: [],
        schema: [],
        fetch: [],
        fields: this.fb.array([])
      }),
      nav: [],
      icon: []
    });
  }

  private getPages(): void {
    this.page.api.find().subscribe(data => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of data as WpxPageNode[]) {
        dict[x._id] = {
          title: `${x.name} [ ${x.fragment} ]`,
          key: x._id,
          parent: x.parent,
          icon: x.icon,
          isLeaf: true,
          expanded: true,
          data: x
        };
      }
      for (const x of data as WpxPageNode[]) {
        const options = dict[x._id];
        if (x.parent === 'root') {
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
    });
  }

  getSchemas(): void {
    this.schema.api
      .find<Schema[]>({
        kind: {
          $in: ['collection', 'single']
        }
      })
      .subscribe(result => {
        this.schemas = result;
      });
  }

  fetchData($event: NzFormatEmitEvent) {
    console.log($event.node?.origin.data);
    this.form = this.fb.group({
      name: [],
      parent: [],
      fragment: [],
      router: this.fb.group({
        template: [],
        schema: [],
        fetch: [],
        fields: this.fb.array([])
      }),
      nav: [],
      icon: []
    });
  }

  get routerTemplate(): FormControl {
    return this.form?.get('router')?.get('template') as FormControl;
  }

  get routerFields(): FormArray {
    return this.form?.get('router')?.get('fields') as FormArray;
  }

  setRouterFields(key: string): void {
    const schema = this.schemas.find(v => v.key === key);
    for (const x of schema?.fields!) {
      this.routerFields.push(
        this.fb.group({
          key: [],
          label: [],
          display: [true]
        })
      );
    }
    console.log(schema?.fields);
  }

  sort(event: CdkDragDrop<string[]>): void {
    // moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    // this.fields = [...this.fields];
    // this.schema.sort(this.data!._id, this.fields).subscribe(v => {
    //   if (v.code === 0) {
    //     this.notification.success('操作成功', '字段排序刷新成功');
    //     this.ok.emit(v);
    //   } else {
    //     this.notification.error('操作失败', v.message);
    //   }
    // });
  }

  submit(data: any): void {
    console.log(data);
  }
}
