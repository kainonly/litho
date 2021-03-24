import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductService } from '@api/product.service';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html'
})
export class ProductIndexComponent implements OnInit {
  lists: ListByPage;

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    public productService: ProductService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.lists = this.bit.listByPage({
      id: 'shop-index',
      query: [
        { field: 'name', op: 'like', value: '' }
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
    this.productService.lists(this.lists, refresh, event !== undefined).subscribe(data => {
      this.lists.setData(data);
    });
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]): void {
    this.swal.deleteAlert(
      this.productService.delete(id)
    ).subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        this.message.error(this.bit.l.deleteError);
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
