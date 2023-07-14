import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-sms',
  templateUrl: './sms.component.html'
})
export class SmsComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  tips = {
    phone: {
      default: {
        required: `手机号码不能为空`
      }
    },
    captcha: {
      default: {
        required: `验证码不能为空`
      }
    }
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      area: ['+86', [Validators.required]],
      phone: [null, [Validators.required]],
      captcha: [null, [Validators.required]]
    });
  }

  submit(data: any): void {
    this.loading = true;
    console.log(data);
  }
}
