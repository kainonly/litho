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
  selector: 'wpx-admin-users-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  @Input() doc!: AnyDto<User>;
  form!: FormGroup;
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
    this.departments.getTreeNode(true, null).subscribe(v => {
      this.nodes = v;
    });
    if (!!this.doc.department) {
      this.form.patchValue({
        department: this.doc.department
      });
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    this.users
      .updateOneById(
        this.doc._id,
        {
          $set: {
            department: value.department
          }
        },
        {
          format_doc: {
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
