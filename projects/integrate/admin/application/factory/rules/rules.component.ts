import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SchemaRule } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FactorySerivce } from '../factory.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-factory-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {
  /**
   * 页面单元 ID
   */
  id!: string;
  /**
   * 显隐规则
   */
  rules: SchemaRule[] = [];

  constructor(
    private factory: FactorySerivce,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private message: NzMessageService
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
    this.factory.findOneById(this.id).subscribe(page => {
      this.rules = [...(page.schema?.rules ?? [])];
    });
  }

  /**
   * 打开表单
   */
  form(): void {
    this.modal.create({
      nzTitle: '新增规则',
      nzContent: FormComponent,
      nzComponentParams: {
        id: this.id
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 删除规则
   * @param i
   */
  delete(i: number): void {
    // this.pages.deleteIndex(index).subscribe(v => {
    //   this.getData();
    //   this.message.success('规则删除成功');
    // });
  }
}
