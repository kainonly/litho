import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ListByPage } from 'ngx-bit/factory';
import { RoleService } from '@common/role.service';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html'
})
export class RoleIndexComponent implements OnInit {
  lists: ListByPage;

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    private notification: NzNotificationService,
    public roleService: RoleService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.lists = this.bit.listByPage({
      id: 'role-index',
      query: [
        { field: 'name->zh_cn', op: 'like', value: '' },
        { field: 'name->en_us', op: 'like', value: '' }
      ]
    });
    this.lists.ready.subscribe(() => {
      this.getLists();
    });
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number): void {
    this.roleService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(
        data.map(v => {
          v.acl = v.acl.split(',').map(c => c.split(':'));
          v.resource = v.resource.split(',');
          return v;
        })
      );
    });
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]): void {
    this.swal.deleteAlert(this.roleService.delete(id)).subscribe(res => {
      if (!res.error) {
        this.notification.success(this.bit.l.operateSuccess, this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        this.notification.error(this.bit.l.operateError, this.bit.l.deleteError);
      }
    });
  }

  /**
   * 选中删除
   */
  deleteCheckData(): void {
    const id = this.lists.getChecked().map(v => v.id);
    this.deleteData(id);
  }
}
