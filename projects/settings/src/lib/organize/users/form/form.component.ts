import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, WpxService, validates } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { RolesService } from '../../roles/roles.service';
import { Role } from '../../roles/types';
import { User } from '../types';
import { UsersService } from '../users.service';

@Component({
  selector: 'wpx-settings-users-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: AnyDto<User>;
  @Input() department?: string;
  form?: FormGroup;
  roleList: Array<AnyDto<Role>> = [];
  passwordVisible = false;
  avatar?: string;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private users: UsersService,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-z_]+$/)],
        [this.existsUsername]
      ],
      password: [null, [this.validedPassword]],
      roles: [null, [Validators.required]],
      name: [null],
      avatar: [null],
      status: [true, [Validators.required]]
    });
    this.getRoles();
    if (this.editable) {
      this.form.patchValue(this.editable);
    }
  }

  existsUsername = (control: AbstractControl): Observable<any> => {
    if (control.value === this.editable?.username) {
      return of(null);
    }
    return this.users.hasUsername(control.value);
  };

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return !this.editable ? { required: true } : null;
    }
    return validates.password(control.value);
  };

  getRoles(): void {
    this.roles
      .find(
        { status: true },
        {
          field: ['_id', 'name']
        }
      )
      .subscribe(data => {
        this.roleList = [...data];
      });
  }

  upload(info: NzUploadChangeParam): void {
    if (info.type === 'success') {
      const origin: any = info.file.originFileObj;
      this.avatar = origin['key'];
      this.message.success('头像上传成功');
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: User): void {
    if (!this.editable) {
      data.departments = [this.department!];
      this.users
        .create(data, {
          format_doc: {
            password: 'password',
            roles: 'oids',
            departments: 'oids'
          }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      if (!data.password) {
        delete data.password;
      }
      this.users
        .updateOneById(this.editable._id, {
          update: { $set: data },
          format: { password: 'password' },
          ref: ['roles']
        })
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
