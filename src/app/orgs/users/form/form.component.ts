import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, WpxService, validates } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { RolesService } from '../../roles/roles.service';
import { Role } from '../../roles/types';
import { User } from '../types';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-orgs-users-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<User>;
  /**
   * 部门 ID
   */
  @Input() departmentId?: string;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 权限组列表
   */
  roleList: Array<AnyDto<Role>> = [];
  /**
   * 密码可视
   */
  passwordVisible = false;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
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
        [this.checkUsername]
      ],
      password: [null, [this.validedPassword]],
      roles: [null, [Validators.required]],
      name: [null],
      avatar: [null],
      status: [true, [Validators.required]]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
    this.getRoles();
  }

  /**
   * 检测用户名是否存在
   * @param control
   */
  checkUsername = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.username) {
      return of(null);
    }
    return this.users.checkUsername(control.value);
  };

  /**
   * 验证密码安全性
   * @param control
   */
  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return !this.doc ? { required: true } : null;
    }
    return validates.password(control.value);
  };

  /**
   * 获取权限组
   */
  getRoles(): void {
    this.roles
      .find(
        { status: true },
        {
          keys: ['name']
        }
      )
      .subscribe(data => {
        this.roleList = [...data];
      });
  }

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
      if (this.departmentId) {
        value.department = this.departmentId;
      }
      this.users
        .create(value, {
          xdata: {
            password: 'password',
            roles: 'oids',
            department: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      if (!value.password) {
        delete value.password;
      }
      this.users
        .updateById(
          this.doc._id,
          {
            $set: value
          },
          {
            xdata: {
              password: 'password',
              roles: 'oids',
              department: 'oid'
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
