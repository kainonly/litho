import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DepartmentsService } from '../../departments/departments.service';
import { User } from '../types';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-orgs-users-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc!: AnyDto<User>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 节点
   */
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    private departments: DepartmentsService,
    private users: UsersService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      department: [null]
    });
    if (!!this.doc.department) {
      this.form.patchValue({
        department: this.doc.department
      });
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
    this.users
      .updateById(
        this.doc._id,
        {
          $set: {
            department: value.department
          }
        },
        {
          xdata: {
            department: 'oid'
          }
        }
      )
      .subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
  }
}
