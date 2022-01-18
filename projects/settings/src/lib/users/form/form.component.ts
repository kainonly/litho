import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, Value, WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { RolesService } from '../../roles/roles.service';
import { Role } from '../../roles/types';
import { User } from '../types';
import { UsersService } from '../users.service';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'wpx-settings-users-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: AnyDto<User>;
  form?: FormGroup;
  roleList: Array<AnyDto<Role>> = [];
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
        [Validators.required, Validators.min(4), Validators.pattern(/^[a-z_]+$/)],
        [this.existsUsername]
      ],
      password: [null],
      roles: [null],
      name: [null],
      email: this.fb.array([]),
      avatar: [null],
      labels: this.fb.array([]),
      status: [true, [Validators.required]]
    });
    this.getRoles();
    if (this.editable) {
      this.editable.labels.forEach(() => {
        this.addLabel();
      });
      this.form.patchValue(this.editable);
    }
  }

  existsUsername = (control: AbstractControl): Observable<any> => {
    if (control.value === this.editable?.username) {
      return of(null);
    }
    return this.users.hasUsername(control.value);
  };

  getRoles(): void {
    this.roles.find().subscribe(data => {
      this.roleList = [...data];
    });
  }

  get email(): FormArray {
    return this.form?.get('email') as FormArray;
  }

  addEmail(value?: string): void {
    this.email.push(this.fb.control(value, [Validators.required, Validators.email]));
  }

  removeEmail(index: number): void {
    this.email.removeAt(index);
  }

  upload(info: NzUploadChangeParam): void {
    if (info.type === 'success') {
      const origin: any = info.file.originFileObj;
      this.avatar = origin['key'];
      this.message.success('头像上传成功');
    }
  }

  get labels(): FormArray {
    return this.form?.get('labels') as FormArray;
  }

  addLabel(value?: Value): void {
    this.labels.push(
      this.fb.group({
        label: [value?.label, [Validators.required]],
        value: [value?.value, [Validators.required, Validators.pattern(/^[a-z_]+$/)]]
      })
    );
  }

  removeLabel(index: number): void {
    this.labels.removeAt(index);
  }

  importLabels(): void {
    this.modal.create({
      nzTitle: '设置导入的标签',
      nzContent: LabelComponent,
      nzComponentParams: {
        exists: (this.labels.value as Value[]).map(v => v.value)
      },
      nzOnOk: instance => {
        for (const x of instance.items) {
          if (x.direction === 'right') {
            this.addLabel({
              label: x.title,
              value: x['value']
            });
          }
        }
      }
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.users.create({ doc: data }).subscribe(() => {
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.users.updateOneById(this.editable._id, { update: { $set: data } }).subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
    }
  }
}
