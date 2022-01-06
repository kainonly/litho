import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Field, Page } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { fieldTypeValues } from '../values';
import { WpxPagesSerivce } from '../wpx-pages.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-settings-pages-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  key!: string;
  private page!: AnyDto<Page>;

  fieldList: Field[] = [];
  datatype: Record<string, string> = Object.fromEntries([].concat(...(fieldTypeValues.map(v => v.values) as any[])));

  constructor(
    private pages: WpxPagesSerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private notification: NzNotificationService,
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
    const fields = this.page!.schema!.fields;
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
      .subscribe(v => {
        if (v.code === 0) {
          this.getData();
          this.message.success('字段排序刷新成功');
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
  }

  delete(data: Field): void {
    this.pages.deleteSchemaField(this.key, data.key).subscribe(v => {
      if (v.code === 0) {
        this.getData();
        this.message.success('字段移除成功');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
