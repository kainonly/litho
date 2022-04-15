import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { RolesService } from '../roles.service';
import { Role } from '../types';

@Component({
  selector: 'wpx-admin-roles-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() doc?: AnyDto<Role>;
  form?: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required], [this.existsName]],
      description: [],
      status: [true, [Validators.required]]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  existsName = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.name) {
      return of(null);
    }
    return this.roles.existsName(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    if (!this.doc) {
      this.roles.create(value).subscribe(() => {
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.roles.updateOneById(this.doc._id, { $set: value }).subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
    }
  }
}
