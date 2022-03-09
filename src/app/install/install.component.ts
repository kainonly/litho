import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@common/app.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent implements OnInit {
  now = new Date().getFullYear();
  step = 1;
  form!: FormGroup;
  panels = [true, false, false];
  install = false;

  constructor(
    private appService: AppService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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

  pre(): void {
    this.step -= 1;
  }

  next(): void {
    this.step += 1;
  }

  submit(data: any): void {
    if (!data.readme) {
      // 提示
    }
    this.install = true;
    delete data.readme;
    console.log(data);
  }
}
