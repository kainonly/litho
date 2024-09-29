import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any } from '@common';
import { ShareModule } from '@common/share.module';
import { validates } from '@common/utils/helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-nav-profile-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent {
  app = inject(AppService);
  private fb = inject(FormBuilder);
  private ref = inject(NzModalRef);
  private message = inject(NzMessageService);
  validedPassword = (control: AbstractControl): Any => {
    if (!control.value) {
      return;
    }
    return validates.password(control.value);
  };
  form: FormGroup = this.fb.group({
    old: [null, [Validators.required, this.validedPassword]],
    password: [null, [Validators.required, this.validedPassword]]
  });
  tips = {
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
  oldVisible = false;
  passwordVisible = false;

  close(): void {
    this.ref.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUserPassword(data.old, data.password).subscribe(() => {
      this.message.success(`Update successful`);
      this.ref.triggerOk();
    });
  }
}
