import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@common/app.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent implements OnInit {
  step = 0;
  /**
   * 说明须知
   */
  sections = [true, false, false];
  form!: FormGroup;
  /**
   * 密码显示
   */
  passwordVisible = false;
  installing = false;
  data: any;

  constructor(private appService: AppService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      readme: [false, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]],
      template: []
    });
  }

  get readme(): FormControl {
    return this.form.get('readme') as FormControl;
  }

  get username(): FormControl {
    return this.form?.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form?.get('password') as FormControl;
  }

  /**
   * 返回
   */
  pre(): void {
    this.step -= 1;
  }

  /**
   * 下一步
   */
  next(): void {
    this.step += 1;
  }

  /**
   * 提交初始化
   * @param data
   */
  submit(data: any): void {
    if (!data.readme) {
      this.message.error('请点击已阅读');
    }
    this.installing = true;
    delete data.readme;
    this.appService.install(data).subscribe({
      next: () => {
        this.message.success('应用初始化完成');
        this.installing = false;
        this.data = data;
        this.step += 1;
      },
      error: () => {
        this.installing = false;
      }
    });
  }
}
