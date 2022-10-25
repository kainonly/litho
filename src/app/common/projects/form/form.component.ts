import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { Project } from '@common/types';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-projects-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<Project>;
  /**
   * 表单
   */
  form!: UntypedFormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
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
      // this.users
      //   .create(value, {
      //     xdata: {
      //       password: 'password',
      //       roles: 'oids',
      //       department: 'oid'
      //     }
      //   })
      //   .subscribe(() => {
      //     this.message.success('数据新增完成');
      //     this.modalRef.triggerOk();
      //   });
    } else {
      // this.users
      //   .updateById(
      //     this.doc._id,
      //     {
      //       $set: value
      //     },
      //     {
      //       xdata: {
      //         password: 'password',
      //         roles: 'oids',
      //         department: 'oid'
      //       }
      //     }
      //   )
      //   .subscribe(() => {
      //     this.message.success('数据更新完成');
      //     this.modalRef.triggerOk();
      //   });
    }
  }
}
