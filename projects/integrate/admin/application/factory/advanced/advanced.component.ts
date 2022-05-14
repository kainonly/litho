import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'wpx-admin-factory-advanced',
  templateUrl: './advanced.component.html'
})
export class AdvancedComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      event: [false, [Validators.required]]
    });
    this.getData();
  }

  getData(): void {
    this.pages.getPage().subscribe(v => {
      this.form.patchValue({
        event: v.schema?.event
      });
    });
  }

  submit(data: any): void {
    this.pages.updateSchemaAdvanced(this.pages.id!, data).subscribe(() => {
      this.message.success('设置已更新');
    });
  }
}
