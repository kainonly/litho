import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { UsersApi } from '@shared/apis/users-api';
import { Any, User } from '@shared/models';

import { tips } from './tips';

export interface FormInput {
  data?: User;
}

@Component({
  imports: [SharedModule],
  selector: 'app-system-general-users-form',
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form implements OnInit {
  input = inject<FormInput>(NZ_MODAL_DATA);
  global = inject(Global);
  users = inject(UsersApi);

  private destroyRef = inject(DestroyRef);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/[0-9]{11}/)]],
    password: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });
  tips = tips;

  ngOnInit(): void {
    if (this.input.data) {
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
      this.getData(this.input.data.id);
    }
  }

  getData(id: string): void {
    this.users
      .findById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.form.patchValue({
          ...data,
          password: ''
        });
      });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    const dto = {
      ...data
    };
    if (!this.input.data) {
      this.users
        .create(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`新增成功`);
          this.modalRef.triggerOk();
        });
    } else {
      dto.id = this.input.data.id;
      if (!dto.password) {
        delete dto.password;
      }
      this.users
        .update(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
