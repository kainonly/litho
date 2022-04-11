import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { RolesService } from '../roles.service';
import { Role } from '../types';

@Component({
  selector: 'wpx-settings-roles-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: AnyDto<Role>;
  form?: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private modal: NzModalService,
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
    if (this.editable) {
      this.form.patchValue(this.editable);
    }
  }

  existsName = (control: AbstractControl): Observable<any> => {
    if (control.value === this.editable?.name) {
      return of(null);
    }
    return this.roles.hasName(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.roles.create(data).subscribe(() => {
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.roles.updateOneById(this.editable._id, { $set: data }).subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
    }
  }
}
