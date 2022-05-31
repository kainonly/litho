import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, Page } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'wpx-admin-factory-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() doc?: AnyDto<Page>;
  nodes: NzTreeNodeOptions[] = [];
  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    this.pages.getTreeNode({}).subscribe(v => {
      this.nodes = [...v];
    });
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: [],
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
  }

  get schema(): FormGroup {
    return this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsKey]]
    });
  }

  existsKey = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.schema?.key) {
      return of(null);
    }
    return this.pages.existsSchemaKey(control.value);
  };

  changedKind(value: string): void {
    if (value === 'group') {
      this.form?.removeControl('manifest');
      this.form?.removeControl('schema');
    } else {
      this.form?.addControl('manifest', this.fb.control('default', [Validators.required]));
      this.form?.addControl('schema', this.schema);
    }
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: Page): void {
    if (!this.doc) {
      // 初始化 fields
      data.schema!.fields = [];
      this.pages
        .create(data, {
          format_doc: { parent: 'oid' }
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
      this.pages
        .updateOneById(
          this.doc._id,
          { $set: data },
          {
            format_doc: { parent: 'oid' }
          }
        )
        .subscribe(v => {
          this.message.success('数据更新完成');
          this.modal.triggerOk();
        });
    }
  }
}
