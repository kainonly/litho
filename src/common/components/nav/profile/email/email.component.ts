import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AppService } from '@app';
import { Any } from '@common';
import { UsersService } from '@common/services/users.service';
import { ShareModule } from '@common/share.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-nav-profile-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  app = inject(AppService);
  private fb = inject(FormBuilder);
  private ref = inject(NzModalRef);
  private message = inject(NzMessageService);
  private users = inject(UsersService);

  existsEmail = (control: AbstractControl): Observable<Any> => {
    if (control.value === this.app.activeUser()!.email) {
      return of(null);
    }
    return this.users.existsValue(new HttpParams().set('email', control.value));
  };
  form: FormGroup = this.fb.group({
    email: [null, [Validators.email], [this.existsEmail]]
  });
  tips = {
    email: {
      default: {
        required: `Email cannot be empty`,
        email: `Must be in email format`
      }
    }
  };

  ngOnInit(): void {
    this.form.patchValue(this.app.activeUser()!);
  }

  close(): void {
    this.ref.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUser({ key: 'email', email: data.email }).subscribe(() => {
      this.message.success(`Update successful, you need to sign in again`);
      this.ref.triggerOk();
    });
  }
}
