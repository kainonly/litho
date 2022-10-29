import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { SchedulesService } from '../schedules.service';
import { Schedule } from '../types';

@Component({
  selector: 'app-developer-schedules-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<Schedule>;
  /**
   * 表单
   */
  form!: UntypedFormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: UntypedFormBuilder,
    private schedules: SchedulesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      status: [true, [Validators.required]]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param value
   */
  submit(value: any): void {
    if (!this.doc) {
      this.schedules.create(value).subscribe(() => {
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.schedules
        .updateById(this.doc._id, {
          $set: value
        })
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
