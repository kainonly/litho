import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any } from '@common';
import { ShareModule } from '@common/share.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  standalone: true,
  imports: [ShareModule, NzQRCodeModule],
  selector: 'app-nav-profile-totp',
  templateUrl: './totp.component.html'
})
export class TotpComponent implements OnInit {
  app = inject(AppService);
  private fb = inject(FormBuilder);
  private ref = inject(NzModalRef);
  private message = inject(NzMessageService);

  form: FormGroup = this.fb.group({
    ts1: [null, [Validators.required, Validators.pattern(/[0-9]{6}/)]],
    ts2: [null, [Validators.required, Validators.pattern(/[0-9]{6}/)]]
  });
  status: 'active' | 'expired' | 'loading' = 'loading';
  totp: string = '';

  private timeId?: Any;

  ngOnInit(): void {
    this.getTotp();
  }

  getTotp(): void {
    this.status = 'loading';
    this.app.getTotp().subscribe(data => {
      this.timeId = setTimeout(() => {
        this.status = 'expired';
      }, 299 * 1000);

      this.totp = data['totp'];
      this.status = 'active';
    });
  }

  close(): void {
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.ref.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUserTotp(this.totp!, [data.ts1, data.ts2]).subscribe(() => {
      this.message.success(`Update successful`);
      this.ref.triggerOk();
    });
  }
}
