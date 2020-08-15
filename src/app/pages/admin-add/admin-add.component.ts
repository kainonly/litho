import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { asyncValidator } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { AdminService } from '@common/admin.service';
import { RoleService } from '@common/role.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html'
})
export class AdminAddComponent implements OnInit {
  form: FormGroup;
  avatar = '';
  roleLists: any[] = [];

  constructor(
    private swal: BitSwalService,
    private fb: FormBuilder,
    public bit: BitService,
    private notification: NzNotificationService,
    private adminService: AdminService,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ], [this.validedUsername]
      ],
      password: [null, this.validedPassword],
      password_check: [null, [this.checkPassword]],
      role: [null, [Validators.required]],
      call: [null],
      email: [null, [Validators.email]],
      phone: [null],
      status: [true, [Validators.required]]
    });
    this.getRole();
  }

  validedUsername = (control: AbstractControl) => {
    return asyncValidator(this.adminService.validedUsername(control.value));
  };

  validedPassword = (control: AbstractControl) => {
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return { required: true };
    }
    control.parent.get('password_check').updateValueAndValidity();
    const value = control.value;
    const len = value.length;
    if (len < 12) {
      return { min: true, error: true };
    }
    if (len > 20) {
      return { max: true, error: true };
    }
    if (value.match(/^(?=.*[a-z])[\w|@$!%*?&-+]+$/) === null) {
      return { lowercase: true, error: true };
    }
    if (value.match(/^(?=.*[A-Z])[\w|@$!%*?&-+]+$/) === null) {
      return { uppercase: true, error: true };
    }
    if (value.match(/^(?=.*[0-9])[\w|@$!%*?&-+]+$/) === null) {
      return { number: true, error: true };
    }
    if (value.match(/^(?=.*[@$!%*?&-+])[\w|@$!%*?&-+]+$/) === null) {
      return { symbol: true, error: true };
    }
    return null;
  };

  checkPassword = (control: AbstractControl) => {
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return { required: true };
    }
    const password = control.parent.get('password').value;
    if (control.value !== password) {
      return { correctly: true, error: true };
    }
    return null;
  };

  /**
   * 获取权限组
   */
  getRole() {
    this.roleService.originLists().subscribe(data => {
      this.roleLists = data;
    });
  }

  /**
   * 上传
   */
  upload(info) {
    if (info.type === 'success') {
      this.avatar = info.file.response.data.save_name;
      this.notification.success(
        this.bit.l.success,
        this.bit.l.uploadSuccess
      );
    }
    if (info.type === 'error') {
      this.notification.error(
        this.bit.l.notice,
        this.bit.l.uploadError
      );
    }
  }

  /**
   * 提交
   */
  submit(data) {
    if (this.avatar) {
      data.avatar = this.avatar;
    }
    delete data.password_check;
    this.adminService.add(data).pipe(
      switchMap(res => this.swal.addAlert(res, this.form, {
        status: true
      }))
    ).subscribe(() => {
    });
  }
}
