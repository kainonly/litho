import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DepartmentsService } from '../departments.service';
import { Department } from '../types';

@Component({
  selector: 'wpx-admin-departments-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<Department>;
  /**
   * 预设父节点
   */
  @Input() parent?: string;
  /**
   * 节点
   */
  nodes: NzTreeNodeOptions[] = [];
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private departments: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: [this.parent],
      description: [null]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
    this.departments.getTreeNode(true).subscribe(v => {
      this.nodes = [...v];
    });
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
      value.sort = 9999;
      this.departments
        .create(value, {
          xdoc: {
            parent: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      this.departments
        .updateOneById(
          this.doc._id,
          {
            $set: value
          },
          {
            xdoc: {
              parent: 'oid'
            }
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
