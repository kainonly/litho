import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AnyDto, Data, WpxService } from '@weplanx/ng';
import { TableField, WpxTableComponent } from '@weplanx/ng/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DepartmentsComponent } from '../departments/departments.component';
import { DepartmentComponent } from './department/department.component';
import { FormComponent } from './form/form.component';
import { User } from './types';
import { UsersService } from './users.service';

@Component({
  selector: 'app-orgs-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  /**
   * 部门视图
   */
  @ViewChild(DepartmentsComponent) departments!: DepartmentsComponent;
  /**
   * 用户表格视图
   */
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<User>;
  /**
   * 字段
   */
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['username', { label: '用户名', type: 'string', keyword: true }],
    ['roles', { label: '权限组', type: 'ref', option: { reference: 'roles', target: 'name' } }],
    ['name', { label: '称呼', type: 'string' }],
    ['status', { label: '状态', type: 'bool' }]
  ]);
  /**
   * 当前部门 ID
   */
  departmentId: string = '';
  /**
   * 数据
   */
  data: Data<AnyDto<User>> = new Data<AnyDto<User>>();

  constructor(
    public users: UsersService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.data.xfilter = {
      department: 'oid'
    };
    this.route.params.subscribe(v => {
      this.departmentId = v?.['department'] ?? '';
    });
  }

  ngOnDestroy(): void {
    this.data.filter = {};
    this.table.updateStorage();
  }

  /**
   * 部门切换
   */
  selectedDepartment(): void {
    if (this.departmentId) {
      this.data.filter.department = this.departmentId;
    } else {
      delete this.data.filter.department;
    }
    this.table.getData(true);
    const params = this.departmentId ? { department: this.departmentId } : {};
    this.router.navigate(['orgs', 'users', params]);
  }

  /**
   * 编辑表单
   * @param doc
   */
  form(doc?: AnyDto<User>): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.username}】`,
      nzWidth: 800,
      nzContent: FormComponent,
      nzComponentParams: {
        doc,
        departmentId: this.departmentId
      },
      nzOnOk: () => {
        this.table.getData(true);
      }
    });
  }

  /**
   * 设置部门
   * @param doc
   */
  setDepartment(doc: AnyDto<User>): void {
    this.modal.create({
      nzTitle: `设置【${doc.username}】部门`,
      nzContent: DepartmentComponent,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.table.getData(true);
      }
    });
  }

  /**
   * 删除
   * @param doc
   */
  delete(doc: AnyDto<User>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.username}】用户吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.table.getData(true);
        });
      },
      nzCancelText: '再想想'
    });
  }

  /**
   * 批量删除
   */
  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要删除这些用户吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users
          .bulkDelete(
            {
              _id: { $in: [...this.data.checkedIds.values()] }
            },
            {
              xfilter: {
                '_id.$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success('数据删除完成');
            this.table.getData(true);
            this.data.clearChecked();
          });
      },
      nzCancelText: '再想想'
    });
  }
}
