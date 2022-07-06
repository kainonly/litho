import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, Page } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FactorySerivce } from '../../factory.serivce';

@Component({
  selector: 'wpx-admin-factory-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 编辑数据
   */
  @Input() doc?: AnyDto<Page>;
  /**
   * 预设父节点
   */
  @Input() parent?: string;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 页面树形节点
   */
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private factory: FactorySerivce
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: [this.parent],
      kind: ['default', [Validators.required]],
      manifest: ['default', [Validators.required]],
      icon: [],
      status: [true, [Validators.required]],
      schema: this.schema
    });
    if (this.doc) {
      this.changedKind(this.doc.kind);
      this.form.patchValue(this.doc);
    }
    this.factory.getTreeNode({ kind: 'group' }).subscribe(v => {
      this.nodes = [...v];
    });
  }

  /**
   * 检测命名唯一性
   * @param control
   */
  existsKey = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.schema?.key) {
      return of(null);
    }
    return this.factory.existsSchemaKey(control.value);
  };

  /**
   * @private
   */
  private get schema(): FormGroup {
    return this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsKey]]
    });
  }

  /**
   * 切换种类
   * @param value
   */
  changedKind(value: string): void {
    if (['manual', 'group'].includes(value)) {
      this.form?.removeControl('manifest');
      this.form?.removeControl('schema');
    }
    if (['default', 'aggregation'].includes(value)) {
      this.form?.addControl('manifest', this.fb.control('default', [Validators.required]));
      if (value === 'aggregation') {
        this.form?.removeControl('schema');
      } else {
        this.form?.addControl('schema', this.schema);
      }
    }
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modal.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: Page): void {
    if (!this.doc) {
      // 初始化 fields
      data.sort = 9999;
      if (data.schema) {
        data.schema.fields = [];
      }
      this.factory
        .create(data, {
          xdoc: { parent: 'oid' }
        })
        .subscribe(v => {
          this.message.success('数据新增完成');
          this.modal.triggerOk();
        });
    } else {
      if (data.schema) {
        Reflect.set(data, 'schema.key', data.schema!.key);
        delete data.schema;
      }
      this.factory
        .updateOneById(
          this.doc._id,
          { $set: data },
          {
            xdoc: { parent: 'oid' }
          }
        )
        .subscribe(v => {
          this.message.success('数据更新完成');
          this.modal.triggerOk();
        });
    }
  }
}
