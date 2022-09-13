import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto } from '@weplanx/ng';
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
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<Role>;
  /**
   * 表单
   */
  form!: UntypedFormGroup;

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder,
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

  /**
   * 验证权限组名称是否存在
   * @param control
   */
  existsName = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.name) {
      return of(null);
    }
    return this.roles.existsName(control.value);
  };

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param value
   */
  submit(value: any): void {
    if (!this.doc) {
      value['pages'] = {};
      this.roles.create(value).subscribe(() => {
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.roles.updateById(this.doc._id, { $set: value }).subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
    }
  }
}
