import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd';
import { AdminService } from '@common/admin.service';
import { RoleService } from '@common/role.service';
import { ListByPage } from 'ngx-bit/factory';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html'
})
export class AdminIndexComponent implements OnInit {
  lists: ListByPage;
  role: any = {};

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    public adminService: AdminService,
    private roleService: RoleService,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.lists = this.bit.listByPage({
      id: 'admin-index',
      query: [
        { field: 'username', op: 'like', value: '' }
      ]
    });
    this.getLists();
    this.getRole();
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number) {
    this.adminService.lists(
      this.lists,
      refresh,
      event !== undefined
    ).subscribe((data) => {
      this.lists.setData(data);
    });
  }

  /**
   * 获取权限组
   */
  getRole() {
    this.roleService.originLists().subscribe((data) => {
      for (const x of data) {
        this.role[x.key] = x;
      }
    });
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]) {
    this.swal.deleteAlert(this.adminService.delete(id)).subscribe((res) => {
      if (!res.error) {
        this.notification.success(
          this.bit.l.operateSuccess,
          this.bit.l.deleteSuccess
        );
        this.getLists(true);
      } else {
        if (res.msg === 'error:self') {
          this.notification.error(
            this.bit.l.operateError,
            this.bit.l.errorDeleteSelf
          );
        } else {
          this.notification.error(
            this.bit.l.operateError,
            this.bit.l.deleteError
          );
        }
      }
    });
  }

  /**
   * 选中删除
   */
  deleteCheckData() {
    const id = this.lists.getChecked().map((v) => v.id);
    this.deleteData(id);
  }

  /**
   * 自定义返回结果
   */
  statusFeedback(res: any) {
    if (res.msg === 'error:self') {
      this.notification.error(
        this.bit.l.operateError,
        this.bit.l.errorStatusSelf
      );
    } else {
      this.notification.error(
        this.bit.l.operateError,
        this.bit.l.statusError
      );
    }
  }
}
