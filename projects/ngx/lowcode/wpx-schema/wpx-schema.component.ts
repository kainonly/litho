import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { asyncValidator } from '@weplanx/ngx';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Field } from './field';
import { WpxSchemaService } from './wpx-schema.service';

@Component({
  selector: 'wpx-schema',
  templateUrl: './wpx-schema.component.html',
  styleUrls: ['./wpx-schema.component.scss']
})
export class WpxSchemaComponent implements OnInit {
  @ViewChild('createSchemaContent') createSchemaContent!: TemplateRef<any>;
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  node?: NzTreeNodeOptions;

  form?: FormGroup;
  formVisible = false;
  fields: Field[] = [];

  constructor(
    private schema: WpxSchemaService,
    private nzContextMenuService: NzContextMenuService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
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
            title: `${x.name} [ ${x.collection} ]`,
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

  openForm(): void {
    this.form = this.fb.group({
      collection: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsCollection]],
      name: [null, [Validators.required]],
      kind: ['collection', [Validators.required]]
    });
    this.formVisible = true;
  }

  existsCollection = (control: AbstractControl) => asyncValidator(this.schema.existsCollection(control.value));

  cancelForm(): void {
    this.form = undefined;
    this.formVisible = false;
  }

  submit(data: any): void {
    this.schema.api.create(data).subscribe(v => {
      if (v.code === 0) {
        this.notification.success('操作成功', '表单数据已提交完成');
        this.getData();
      }
    });
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    if (!$event.node?.origin.data) {
      return;
    }
    this.node = $event.node;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  delete(): void {
    this.modal.confirm({
      nzTitle: '您确定要作废该内容类型吗?',
      nzContent: '该操作不会真实删除数据库集合，如必须删除需要通过数据库控制完成',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.schema.api.delete({ _id: this.node?.origin.data._id }).subscribe(v => {
          if (v.code === 0) {
            this.notification.success('操作成功', '表单数据已提交完成');
            this.getData();
          } else {
            this.notification.error('操作失败', v.message);
          }
        });
      },
      nzCancelText: '再想想'
    });
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
