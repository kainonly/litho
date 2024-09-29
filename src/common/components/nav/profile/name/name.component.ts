import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '@app';
import { Any } from '@common';
import { ShareModule } from '@common/share.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-nav-profile-name',
  templateUrl: './name.component.html'
})
export class NameComponent implements OnInit {
  app = inject(AppService);
  private fb = inject(FormBuilder);
  private ref = inject(NzModalRef);
  private message = inject(NzMessageService);

  form: FormGroup = this.fb.group({
    name: [null, []]
  });

  ngOnInit(): void {
    this.form.patchValue(this.app.activeUser()!);
  }

  close(): void {
    this.ref.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUser({ key: 'name', name: data.name }).subscribe(() => {
      this.message.success(`Update successful`);
      this.ref.triggerOk();
    });
  }
}
