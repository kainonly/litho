import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { Any } from '@weplanx/ng';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  tips = {
    email: {
      default: {
        required: `Email cannot be empty`,
        email: `Must be in email format`
      }
    },
    password: {
      default: {
        required: `Password cannot be empty`
      }
    }
  };

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(data: Any): void {
    this.loading = true;
    this.app.login(data.email, data.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/');
        this.notification.success(`Authentication Status`, `🚀Login successful, loading data...`);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
