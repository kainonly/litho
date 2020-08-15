import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd';
import { AclService } from '@common/acl.service';
import { ListByPage } from 'ngx-bit/factory';

@Component({
  selector: 'app-acl-index',
  templateUrl: './acl-index.component.html'
})
export class AclIndexComponent implements OnInit {
  lists: ListByPage;

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    public aclService: AclService,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.lists = this.bit.listByPage({
      id: 'acl-index',
      query: [
        { field: 'name->zh_cn', op: 'like', value: '' },
        { field: 'name->en_us', op: 'like', value: '' }
      ]
    });
    this.getLists();
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number) {
    this.aclService.lists(
      this.lists,
      refresh,
      event !== undefined
    ).subscribe(data => {
      this.lists.setData(data);
    });
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]) {
    this.swal.deleteAlert(this.aclService.delete(id)).subscribe(res => {
      if (!res.error) {
        this.notification.success(
          this.bit.l.operateSuccess,
          this.bit.l.deleteSuccess
        );
        this.getLists(true);
      } else {
        this.notification.error(
          this.bit.l.operateError,
          this.bit.l.deleteError
        );
      }
    });
  }

  /**
   * 选中删除
   */
  deleteCheckData() {
    const id = this.lists.getChecked().map(v => v.id);
    this.deleteData(id);
  }
}
