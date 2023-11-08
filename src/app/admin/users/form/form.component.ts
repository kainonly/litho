import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { User } from '@common/models/user';
import { UsersService } from '@common/services/users.service';
import { Any, AnyDto, validates } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
  doc?: AnyDto<User>;
}

@Component({
  selector: 'app-users-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    email: {
      default: {
        required: `Email cannot be empty`,
        email: `Must be in email format`,
        duplicated: `Email must be unique`
      }
    },
    password: {
      default: {
        required: `Password cannot be empty`,
        minlength: `The password length must be greater than 8`,
        lowercase: `The password needs to contain lowercase letters`,
        uppercase: `The password needs to contain uppercase letters`,
        number: `The password needs to contain numbers`,
        symbol: `The password needs to contain symbols (@$!%*?&-+)`,
        inconsistent: `The password confirmed again is inconsistent`
      }
    }
  };
  passwordVisible = false;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.checkEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
      avatar: [''],
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.get('password')?.setValidators([Validators.minLength(6)]);
      this.form.patchValue(this.data.doc);
    }
  }

  checkEmail = (control: AbstractControl): Observable<Any> => {
    if (control.value === this.data.doc?.email) {
      return of(null);
    }
    return this.users.existsEmail(control.value);
  };

  validedPassword = (control: AbstractControl): Any => {
    if (!control.value) {
      return !this.data.doc ? { required: true } : null;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.users
        .create(data, {
          xdata: { password: 'password' }
        })
        .subscribe(() => {
          this.message.success(`Update successful`);
          this.modalRef.triggerOk();
        });
    } else {
      if (!data.password) {
        delete data.password;
      }
      this.users
        .updateById(
          this.data.doc._id,
          {
            $set: data
          },
          {
            xdata: { password: 'password' }
          }
        )
        .subscribe(() => {
          this.message.success(`Update successful`);
          this.modalRef.triggerOk();
        });
    }
  }
}
