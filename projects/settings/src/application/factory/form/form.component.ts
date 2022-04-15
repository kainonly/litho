import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, Page } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'wpx-settings-factory-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() doc?: AnyDto<Page>;
  @Input() nodes?: NzTreeNodeOptions[];
  parentNodes?: NzTreeNodeOptions[];

  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    if (this.nodes) {
      this.parentNodes = [...this.nodes];
    }
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: [],
      kind: ['default', [Validators.required]],
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
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsKey]],
      fields: [{}]
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
      this.form?.removeControl('schema');
    } else {
      this.form?.addControl('schema', this.schema);
    }
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: Page): void {
    if (!this.doc) {
      this.pages.create(data).subscribe(v => {
        this.message.success('数据新增完成');
        this.modal.triggerOk();
      });
    } else {
      this.pages.updateOneById(this.doc._id, { $set: data }).subscribe(v => {
        this.message.success('数据更新完成');
        this.modal.triggerOk();
      });
    }
  }
}
