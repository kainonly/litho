import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { AdminService } from '@common/admin.service';
import { RoleService } from '@common/role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html'
})
export class AdminEditComponent implements OnInit {
  private id: number;
  form: FormGroup;
  username: string;
  avatar = '';
  roleLists: any[] = [];

  constructor(
    private swal: BitSwalService,
    private fb: FormBuilder,
    public bit: BitService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private adminService: AdminService,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      password: [null, [this.validedPassword]],
      password_check: [null, [this.checkPassword]],
      role: [null, [Validators.required]],
      call: [null],
      email: [null, [Validators.email]],
      phone: [null],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getData();
      this.getRole();
    });
  }

  validedPassword = (control: AbstractControl) => {
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return;
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
      return;
    }
    const password = control.parent.get('password').value;
    if (control.value !== password) {
      return { correctly: true, error: true };
    }
    return null;
  };

  /**
   * 获取数据
   */
  getData() {
    this.adminService.get(this.id).subscribe(data => {
      if (data.self) {
        BitSwalService.native.fire({
          title: this.bit.l.operateInfo,
          text: this.bit.l.selfTips,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: this.bit.l.goProfile,
          cancelButtonText: this.bit.l.operateBack
        }).then(result => {
          if (result.value) {
            this.bit.open(['profile']);
          } else {
            this.bit.back();
          }
        });
      }
      this.username = data.username;
      this.form.patchValue({
        role: data.role,
        call: data.call,
        email: data.email,
        phone: data.phone,
        status: data.status
      });
    });
  }

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
    Reflect.set(data, 'id', this.id);
    Reflect.set(data, 'avatar', this.avatar);
    delete data.password_check;
    this.adminService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe((status) => {
      if (status) {
        this.getData();
      }
    });
  }
}
