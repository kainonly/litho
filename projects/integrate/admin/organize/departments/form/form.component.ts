import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DepartmentsService } from '../departments.service';
import { Department } from '../types';

@Component({
  selector: 'wpx-admin-departments-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() doc?: AnyDto<Department>;
  @Input() nodes?: NzTreeNodeOptions[];
  @Input() parent?: string;
  parentNodes?: NzTreeNodeOptions[];
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private departments: DepartmentsService
  ) {}

  ngOnInit(): void {
    if (this.nodes) {
      this.parentNodes = [...this.nodes];
    }
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: [this.parent],
      description: [null]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    if (!this.doc) {
      this.departments
        .create(value, {
          format_doc: {
            parent: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      this.departments
        .updateOneById(
          this.doc._id,
          {
            $set: value
          },
          {
            format_doc: {
              parent: 'oid'
            }
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
