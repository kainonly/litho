import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '@app';
import { User } from '@common/models/user';
import { UsersService } from '@common/services/users.service';
import { Any, AnyDto, Filter, WpxModel, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  model!: WpxModel<User>;
  form!: FormGroup;
  filter: Filter<User> = {};

  constructor(
    public app: AppService,
    private wpx: WpxService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    public users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      name: []
    });
    this.model = this.wpx.setModel<User>('users', this.users);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch(this.filter).subscribe(() => {
      console.debug('fetch:ok');
    });
  }

  clear(): void {
    this.form.reset();
    this.filter = {};
    this.getData();
  }

  search(data: Any): void {
    for (const [k, v] of Object.entries(data)) {
      if (v) {
        this.filter[k] = { $regex: `${v}` };
      }
    }
    this.getData();
  }

  isSelf(doc?: AnyDto<User>): boolean {
    const result = this.app.user()?._id === doc?._id;
    if (result) {
      this.message.warning(`请通过【个人中心】更新当前登录用户`);
    }
    return result;
  }

  open(doc?: AnyDto<User>): void {
    if (this.isSelf(doc)) {
      return;
    }
    this.modal.create<FormComponent, ModalData>({
      nzTitle: !doc ? '创建' : `编辑【${doc.email}】`,
      nzWidth: 640,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<User>): void {
    if (this.isSelf(doc)) {
      return;
    }
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.email}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    if (this.model.selection.has(this.app.user()!._id)) {
      this.message.warning(`请通过【个人中心】更新当前登录用户`);
      return;
    }
    this.modal.confirm({
      nzTitle: `您确定删除这些用户吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users
          .bulkDelete(
            {
              _id: { $in: [...this.model.selection.keys()] }
            },
            {
              xfilter: {
                '_id.$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success(`数据删除成功`);
            this.getData(true);
            this.model.setCurrentSelections(false);
          });
      },
      nzCancelText: `再想想`
    });
  }
}
