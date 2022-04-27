import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, take } from 'rxjs';

import { validates, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  step = 0;
  verifyForm?: FormGroup;
  pwdForm?: FormGroup;
  passwordVisible = false;
  countdown = 0;

  private token?: string;

  constructor(private fb: FormBuilder, private wpx: WpxService, private message: NzMessageService) {}

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
      this.message.warning('请先填写电子邮件');
      return;
    }
    const email = this.verifyForm!.get('email')!.value;
    this.wpx.forgetCaptcha(email).subscribe({
      next: () => {
        this.countdown = 300;
        interval(1000)
          .pipe(take(300))
          .subscribe(() => {
            this.countdown--;
          });
        this.message.success('验证码已发送至电子邮件');
      }
    });
  }

  verify(data: any): void {
    this.wpx.forgetVerify(data).subscribe(v => {
      this.token = v.token;
      this.step++;
      this.message.success('验证通过，请在5分钟内设置新密码');
    });
  }

  submit(data: any): void {
    data.token = this.token;
    this.wpx.forgetReset(data).subscribe(() => {
      this.step++;
    });
  }
}
