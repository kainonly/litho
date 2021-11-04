import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Page, TreeNodesExpanded, WpxService } from '@weplanx/components';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { SchemaField, Schema } from '../types';
import { WpxSchemaService } from '../wpx-schema/wpx-schema.service';
import { WpxPageSerivce } from './wpx-page.serivce';

@Component({
  selector: 'wpx-page',
  templateUrl: './wpx-page.component.html',
  styleUrls: ['./wpx-page.component.scss']
})
export class WpxPageComponent implements OnInit {
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  schemas: Schema[] = [];

  tabs = 0;
  form?: FormGroup;
  editable?: Page;

  constructor(
    public wpx: WpxService,
    private page: WpxPageSerivce,
    private schema: WpxSchemaService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getPages();
    this.getSchemas();
  }

  private getPages(): void {
    this.page.api.find<Page>().subscribe(result => {
      const nodes: NzTreeNodeOptions[] = [];
      const dict: Record<string, NzTreeNodeOptions> = {};
      for (const x of result) {
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
      for (const x of result) {
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

  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    TreeNodesExpanded(nodes, value);
  }

  getSchemas(): void {
    this.schema.api
      .find<Schema>({
        kind: {
          $in: ['collection', 'single']
        }
      })
      .subscribe(result => {
        this.schemas = result;
      });
  }

  fetchData(event: NzFormatEmitEvent) {
    const data = event.node?.origin.data;
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      fragment: [null, [Validators.required]],
      nav: [false, [Validators.required]],
      icon: [null],
      router: [null],
      option: this.fb.group({
        schema: [null],
        fetch: [false],
        fields: this.fb.array([]),
        validation: []
      })
    });
    if (data?.option?.fields) {
      this.setRouterFields(data.option.fields);
    }
    this.form.patchValue(data);
    this.tabs = 0;
    this.editable = data;
  }

  get router(): FormControl {
    return this.form?.get('router') as FormControl;
  }

  get optionFields(): FormArray {
    return this.form?.get('option')?.get('fields') as FormArray;
  }

  get optionFieldsControls(): any[] {
    return [...this.optionFields?.controls];
  }

  setRouterFields(fields: SchemaField[]): void {
    for (const x of fields) {
      this.optionFields.push(
        this.fb.group({
          key: [x.key],
          label: [x.label],
          display: [true]
        })
      );
    }
  }

  schemaChanged(key: string): void {
    this.optionFields.clear();
    this.setRouterFields(this.schemas.find(v => v.key === key)?.fields!);
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.optionFields.controls, event.previousIndex, event.currentIndex);
    Reflect.set(this.optionFields, 'controls', [...this.optionFields.controls]);
  }

  submit(data: any): void {
    this.page.api.update({ _id: this.editable?._id }, data).subscribe(v => {
      if (v.code === 0) {
        this.notification.success('操作成功', '内容类型更新完成');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
