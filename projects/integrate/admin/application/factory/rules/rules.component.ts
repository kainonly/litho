import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Page, SchemaField, SchemaRule } from '@weplanx/ng';
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
   * 页面单元
   */
  page?: AnyDto<Page>;
  /**
   * 字段
   */
  fields: SchemaField[] = [];
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
    this.factory.findById(this.id).subscribe(page => {
      this.page = page;
      const fields = this.page!.schema?.fields ?? [];
      this.fields = [...fields.sort((a, b) => a.sort - b.sort)];
      this.rules = [...(page.schema?.rules ?? [])];
    });
  }

  /**
   * 打开表单
   */
  form(index?: number, doc?: SchemaRule): void {
    this.modal.create({
      nzTitle: '新增规则',
      nzContent: FormComponent,
      nzComponentParams: {
        id: this.id,
        index,
        doc,
        fields: this.fields
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 删除规则
   * @param index
   */
  delete(index: number): void {
    this.modal.confirm({
      nzTitle: `您确定要删除该规则吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.factory.deleteSchemaRule(this.id, index).subscribe(() => {
          this.getData();
          this.message.success('规则删除成功');
        });
      },
      nzCancelText: '再想想'
    });
  }
}
