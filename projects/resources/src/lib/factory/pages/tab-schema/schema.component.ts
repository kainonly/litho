import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Field, Page } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesSerivce } from '../pages.serivce';
import { fieldTypeValues } from '../values';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-resources-factory-pages-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  key!: string;
  private page!: AnyDto<Page>;

  fieldList: Field[] = [];
  datatype: Record<string, string> = Object.fromEntries([].concat(...(fieldTypeValues.map(v => v.values) as any[])));

  constructor(
    private pages: PagesSerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.key = v['key'];
      this.pages.key$.next(v['key']);
      this.getData();
    });
  }

  getData(): void {
    this.pages.findOneById(this.key).subscribe(v => {
      this.page = v;
      this.setFieldList();
    });
  }

  private setFieldList(): void {
    const fields = this.page.schema?.fields ?? {};

    this.fieldList = [
      ...Object.entries(fields)
        .map(v =>
          Object.assign(v[1], {
            key: v[0]
          })
        )
        .sort((a, b) => a.sort - b.sort)
    ];
  }

  form(editable?: any): void {
    this.modal.create({
      nzTitle: !editable ? '创建字段到该内容类型' : '编辑字段',
      nzWidth: 800,
      nzContent: FormComponent,
      nzComponentParams: {
        editable,
        page: this.page
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fieldList, event.previousIndex, event.currentIndex);
    this.pages
      .sortSchemaFields(
        this.key,
        this.fieldList.map(v => v.key)
      )
      .subscribe(() => {
        this.getData();
        this.message.success('字段排序刷新成功');
      });
  }

  delete(data: Field): void {
    this.modal.confirm({
      nzTitle: `您确定要删除『${data.label}』字段吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.pages.deleteSchemaField(this.key, data.key).subscribe(() => {
          this.getData();
          this.message.success('字段删除成功');
        });
      },
      nzCancelText: '再想想'
    });
  }
}
