import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  name = '';
  nodes: NzTreeNodeOptions[] = [];
  actionNode?: NzTreeNodeOptions;

  schemaForm?: FormGroup;
  schemaFormVisible = false;
  schemaEditable?: Record<string, any>;

  data?: Record<string, any>;
  fields: Field[] = [];

  fieldForm?: FormGroup;
  fieldFormVisible = false;
  fieldEditable?: Record<string, any>;

  group: Array<Record<string, any>> = [
    {
      label: '字符串',
      values: [
        ['text', '文本'],
        ['richtext', '富文本编辑器'],
        ['email', '电子邮件'],
        ['password', '密码输入框']
      ]
    },
    {
      label: '数字',
      values: [
        ['integer', '整数类型'],
        ['decimal', '小数类型']
      ]
    },
    {
      label: '日期',
      values: [
        ['date', '日期选择器'],
        ['time', '时间选择器'],
        ['datetime', '日期时间选择器']
      ]
    },
    {
      label: '其他',
      values: [
        ['bool', '布尔类型'],
        ['enum', '列举'],
        ['media', '媒体文件'],
        ['json', 'JSON'],
        ['reference', '引用']
      ]
    }
  ];
  type: Map<string, string> = new Map<string, string>([].concat(...this.group.map(v => v.values)));
  readonly special = ['integer', 'decimal', 'enum', 'reference'];

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
            title: `${x.label} [ ${x.key} ]`,
            key: x.key,
            icon: !x.system ? '' : 'lock',
            isLeaf: true,
            data: x
          });
        }
      }
      this.nodes = [...Object.values(models)];
    });
  }

  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    for (const node of nodes) {
      node.isExpanded = value;
      if (node.children.length !== 0) {
        this.setExpanded(node.children, value);
      }
    }
  }

  openSchemaForm(data?: Record<string, any>): void {
    if (data && data.system) {
      return;
    }
    this.schemaForm = this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsCollection]],
      label: [null, [Validators.required]],
      kind: ['collection', [Validators.required]]
    });
    this.schemaFormVisible = true;
    if (data) {
      this.schemaEditable = data;
      this.schemaForm.patchValue(data);
      this.schemaForm.get('collection')?.disable();
    }
  }

  existsCollection = (control: AbstractControl) => asyncValidator(this.schema.existsCollection(control.value));

  closeSchemaForm(): void {
    this.schemaForm = undefined;
    this.schemaFormVisible = false;
    this.schemaEditable = undefined;
  }

  submitSchema(data: any): void {
    if (!this.schemaEditable) {
      this.schema.api.create(data).subscribe(v => {
        if (v.code === 0) {
          this.notification.success('操作成功', '内容类型创建完成');
          this.getData();
          this.closeSchemaForm();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    } else {
      this.schema.api.update({ _id: this.schemaEditable._id }, data).subscribe(v => {
        if (v.code === 0) {
          this.notification.success('操作成功', '内容类型更新完成');
          this.getData();
          this.closeSchemaForm();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    }
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    if (!$event.node?.origin.data) {
      return;
    }
    this.actionNode = $event.node;
    this.nzContextMenuService.create($event.event as MouseEvent, menu);
  }

  delete(data: any): void {
    if (data.system) {
      return;
    }
    this.modal.confirm({
      nzTitle: '您确定要作废该内容类型吗?',
      nzContent: '该操作不会真实删除数据库集合，如必须删除需要通过数据库控制完成',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.schema.api.delete({ _id: data._id }).subscribe(v => {
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
    this.data = $event.node?.origin.data;
    this.fields = this.data?.fields ? [...this.data.fields] : [];
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.fields = [...this.fields];
    this.schema.sort(this.data?._id, this.fields).subscribe(v => {
      if (v.code === 0) {
        this.notification.success('操作成功', '字段排序刷新成功');
        this.getData();
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }

  openFieldForm(value?: Field): void {
    this.fieldForm = this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)]],
      label: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null],
      default: [null],
      unique: [false],
      required: [false],
      private: [false],
      option: this.fb.group({
        min: [null],
        max: [null],
        values: this.fb.array([]),
        multiple: [false],
        mode: [null],
        target: [null],
        to: [null]
      })
    });
    this.fieldFormVisible = true;
  }

  closeFieldForm(): void {
    this.fieldForm = undefined;
    this.fieldFormVisible = false;
    this.fieldEditable = undefined;
  }

  submitField(data: any): void {
    console.log(data);
  }

  get enumValues(): FormArray {
    return this.fieldForm?.get('option')?.get('values') as FormArray;
  }

  addEnum(): void {
    this.enumValues.push(
      this.fb.group({
        label: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeEnum(index: number): void {
    this.enumValues.removeAt(index);
  }
}
