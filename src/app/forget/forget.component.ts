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
  verifyForm?: FormGroup;
  pwdForm?: FormGroup;
  tips: any = {
    email: {
      default: {
        required: $localize`电子邮件不能为空`,
        email: $localize`电子邮件格式不规范`
      }
    },
    captcha: {
      default: {
        required: $localize`验证码不能为空`
      }
    },
    password: {
      default: {
        required: $localize`新密码不能为空`,
        minlength: $localize`新密码不能小于 8 位`,
        lowercase: $localize`新密码需要包含小写字母`,
        uppercase: $localize`新密码需要包含大写字母`,
        number: $localize`新密码需要包含数字`,
        symbol: $localize`新密码需要包含符号 (@$!%*?&-+)`
      }
    }
  };

  step = 0;
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
      this.message.warning($localize`请先输入电子邮件`);
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
        this.message.success($localize`验证码已发送至您的电子邮箱`);
      }
    });
  }

  verify(data: any): void {
    this.wpx.verifyCaptcha(data).subscribe(v => {
      this.token = v.token;
      this.step++;
      this.message.success($localize`验证通过后，请在5分钟内设置新密码`);
    });
  }

  submit(data: any): void {
    data.token = this.token;
    this.app.resetUser(data).subscribe(() => {
      this.step++;
    });
  }
}
