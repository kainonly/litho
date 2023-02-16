import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, take } from 'rxjs';

import { AppService } from '@app';
import { validates, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  tips = {
    email: {
      default: {
        required: $localize`The email cannot be empty`,
        email: $localize`The email format is not standardized`
      }
    },
    captcha: {
      default: {
        required: $localize`The verification code cannot be empty`
      }
    },
    password: {
      default: {
        required: $localize`The new password cannot be empty`,
        minlength: $localize`The length of the new password cannot be less than 12 characters`,
        lowercase: $localize`The new password needs to contain lowercase letters`,
        uppercase: $localize`The new password needs to contain capital letters`,
        number: $localize`The new password needs to contain numbers`,
        symbol: $localize`The new password needs to contain symbols (@$!%*?&-+)`
      }
    }
  };

  step = 0;
  verifyForm?: FormGroup;
  pwdForm?: FormGroup;
  passwordVisible = false;
  countdown = 0;

  private token?: string;

  constructor(
    private fb: FormBuilder,
    private wpx: WpxService,
    private app: AppService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      mode: ['email', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      captcha: [null, [Validators.required]]
    });
    this.pwdForm = this.fb.group({
      password: [null, [this.validedPassword]]
    });
  }

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return;
    }
    return validates.password(control.value);
  };

  getCaptcha(): void {
    if (!this.verifyForm?.get('email')?.value) {
      this.message.warning($localize`Please enter the email first`);
      return;
    }
    const email = this.verifyForm!.get('email')!.value;
    this.wpx.getCaptcha(email).subscribe({
      next: () => {
        this.countdown = 300;
        interval(1000)
          .pipe(take(300))
          .subscribe(() => {
            this.countdown--;
          });
        this.message.success($localize`A verification code has been sent to your email`);
      }
    });
  }

  verify(data: any): void {
    this.wpx.verifyCaptcha(data).subscribe(v => {
      this.token = v.token;
      this.step++;
      this.message.success($localize`After verification, please set a new password within 5 minutes`);
    });
  }

  submit(data: any): void {
    data.token = this.token;
    this.app.resetUser(data).subscribe(() => {
      this.step++;
    });
  }
}
