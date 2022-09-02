import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Page } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FactorySerivce } from '../factory.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-factory-indexes',
  templateUrl: './indexes.component.html'
})
export class IndexesComponent implements OnInit {
  /**
   * 页面单元 ID
   */
  id!: string;
  /**
   * 页面单元
   */
  page?: AnyDto<Page>;
  /**
   * 索引数据
   */
  indexes: any[] = [];

  constructor(
    private factory: FactorySerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.id = v['id'];
      this.getData();
    });
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.factory.findById(this.id).subscribe(page => {
      this.page = page;
    });
    this.factory.getIndexes(this.id).subscribe(indexes => {
      this.indexes = [...indexes];
    });
  }

  /**
   * 打开表单
   */
  form(): void {
    this.modal.create({
      nzTitle: '新增索引',
      nzContent: FormComponent,
      nzComponentParams: {
        page: this.page
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 删除索引
   * @param index
   */
  delete(index: string): void {
    this.factory.deleteIndex(this.id, index).subscribe(v => {
      this.getData();
      this.message.success('索引删除成功');
    });
  }
}
