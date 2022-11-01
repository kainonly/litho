import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Page } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesService } from '../pages.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-factory-indexes',
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
    private pages: PagesService,
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
    this.pages.findById(this.id).subscribe(v => {
      this.page = v;
    });
    this.pages.getIndexes(this.id).subscribe(v => {
      this.indexes = [...v];
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
    this.pages.deleteIndex(this.id, index).subscribe(v => {
      this.getData();
      this.message.success('索引删除成功');
    });
  }
}
