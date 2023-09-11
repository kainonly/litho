import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any, validates } from '@weplanx/ng';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html'
})
export class ForgetComponent implements OnInit {
  index = 0;
  tips = {
    email: {
      default: {
        required: `电子邮件不能为空`,
        email: `电子邮件格式不规范`
      }
    },
    code: {
      default: {
        required: `验证码不能为空`,
        pattern: '验证码格式不规范'
      }
    },
    password: {
      default: {
        required: $localize`密码不能为空`,
        minlength: $localize`密码不能小于 8 位`,
        lowercase: $localize`密码需要包含小写字母`,
        uppercase: $localize`密码需要包含大写字母`,
        number: $localize`密码需要包含数字`,
        symbol: $localize`密码需要包含符号 (@$!%*?&-+)`,
        inconsistent: $localize`重置密码不一致`
      }
    }
  };

  verifyForm!: FormGroup;
  emailTimer = 0;
  private emailTimeId?: Any;
  private verifyData?: Any;

  resetForm!: FormGroup;

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      code: [null, [Validators.required, Validators.pattern(/[0-9]{6}/)]]
    });
    this.resetForm = this.fb.group({
      password: [null, [Validators.required, this.validedPassword]],
      check: [null, [Validators.required, this.checkPassword]]
    });
  }

  validedPassword = (control: AbstractControl): Any => {
    if (!control.value) {
      return;
    }
    control.parent?.get('check')!.updateValueAndValidity();
    return validates.password(control.value);
  };

  checkPassword = (control: AbstractControl): Any => {
    if (!control.value) {
      return;
    }
    if (control.value !== control.parent?.get('password')!.value) {
      return { inconsistent: true, error: true };
    }
    return null;
  };

  getForgetCode(): void {
    this.emailTimer = 900;
    this.app.getForgetCode(this.verifyForm.get('email')!.value).subscribe(() => {
      this.emailTimeId = setInterval(() => {
        if (!this.emailTimer) {
          clearInterval(this.emailTimeId);
          return;
        }
        this.emailTimer--;
      }, 1000);
    });
  }

  verifySubmit(data: Any): void {
    this.index++;
    this.verifyData = data;
  }

  previous(): void {
    this.index--;
    this.cdr.detectChanges();
  }

  resetSubmit(data: Any): void {
    this.app.forgetReset(this.verifyData.email, this.verifyData.code, data.password).subscribe(() => {
      this.index++;
    });
  }
}
