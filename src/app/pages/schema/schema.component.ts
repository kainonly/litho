import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Page, SchemaField, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesService } from '../pages.service';
import { fieldTypes } from '../types';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-pages-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  /**
   * 字段类型
   */
  types: Record<string, string> = Object.fromEntries([].concat(...(fieldTypes.map(v => v.values) as any[])));
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

  constructor(
    public wpx: WpxService,
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
      const fields = this.page!.schema?.fields ?? [];
      this.fields = [...fields.sort((a, b) => a.sort - b.sort)];
    });
  }

  /**
   * 打开表单
   * @param doc
   */
  form(doc?: SchemaField): void {
    this.modal.create({
      nzTitle: !doc ? '创建字段' : '编辑字段',
      nzWidth: 800,
      nzContent: FormComponent,
      nzComponentParams: {
        page: this.page!,
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 排序
   * @param e
   */
  sort(e: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fields, e.previousIndex, e.currentIndex);
    this.pages
      .sortSchemaFields(
        this.id,
        this.fields.map(v => v.sort)
      )
      .subscribe(() => {
        this.getData();
        this.message.success('字段排序刷新成功');
      });
  }

  /**
   * 删除
   * @param data
   */
  delete(data: SchemaField): void {
    this.modal.confirm({
      nzTitle: `您确定要删除该字段吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.pages.deleteSchemaField(this.id, data.key).subscribe(() => {
          this.getData();
          this.message.success('字段删除成功');
        });
      },
      nzCancelText: '再想想'
    });
  }
}
