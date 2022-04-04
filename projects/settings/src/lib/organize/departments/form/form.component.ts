import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DepartmentsService } from '../departments.service';
import { Department } from '../types';

@Component({
  selector: 'wpx-settings-departments-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: AnyDto<Department>;
  @Input() nodes?: NzTreeNodeOptions[];
  @Input() parent?: string;
  parentNodes?: NzTreeNodeOptions[];
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
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
    if (this.editable) {
      this.form.patchValue(this.editable);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.departments
        .create({
          doc: data,
          format: { parent: 'object_id' }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      this.departments
        .updateOneById(this.editable._id, {
          update: {
            $set: data
          },
          format: { parent: 'object_id' }
        })
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
