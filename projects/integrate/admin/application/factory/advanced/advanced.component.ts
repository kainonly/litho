import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FactorySerivce } from '../factory.serivce';

@Component({
  selector: 'wpx-admin-factory-advanced',
  templateUrl: './advanced.component.html'
})
export class AdvancedComponent implements OnInit {
  /**
   * 页面单元 ID
   */
  id!: string;
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private factory: FactorySerivce,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      event: [false, [Validators.required]],
      detail: [false]
    });
    this.route.params.subscribe(v => {
      this.id = v['id'];
      this.getData();
    });
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.factory.findById(this.id).subscribe(page => {
      if (['form', 'hide'].includes(page.manifest!)) {
        this.form.get('detail')?.disable();
      }
      this.form.patchValue({
        event: page.schema?.event,
        detail: page.schema?.detail
      });
    });
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    this.factory.updateSchemaAdvanced(this.id, data).subscribe(() => {
      this.message.success('设置已更新');
    });
  }
}
