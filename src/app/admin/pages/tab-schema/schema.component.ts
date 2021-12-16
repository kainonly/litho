import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Field } from '../dto/field';
import { Page } from '../dto/page';
import { PagesSerivce } from '../pages.serivce';
import { fieldTypeValues } from '../values';
import { FieldComponent } from './field/field.component';

@Component({
  selector: 'app-admin-pages-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit, OnDestroy {
  private page?: Page;
  fieldList: Field[] = [];
  datatype: Record<string, string> = Object.fromEntries([].concat(...(fieldTypeValues.map(v => v.values) as any[])));
  private data$!: Subscription;

  constructor(
    private pages: PagesSerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.data$ = this.pages.data$.pipe(skip(1)).subscribe(v => {
      this.page = v[this.pages.key];
      this.setFieldList();
    });
  }

  ngOnDestroy() {
    this.data$.unsubscribe();
  }

  private setFieldList() {
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

  fieldForm(editable?: any) {
    this.modal.create({
      nzTitle: !editable ? '创建字段到该内容类型' : '编辑字段',
      nzWidth: 800,
      nzContent: FieldComponent,
      nzComponentParams: {
        editable,
        page: this.page
      },
      nzOnOk: () => {
        this.pages.refresh.next(true);
      }
    });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fieldList, event.previousIndex, event.currentIndex);
    this.pages
      .sortSchemaFields(
        this.page!._id,
        this.fieldList.map(v => v.key)
      )
      .subscribe(v => {
        if (v.code === 0) {
          this.pages.refresh.next(true);
          this.message.success('字段排序刷新成功');
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
  }

  delete(data: Field): void {
    this.pages.deleteSchemaField(this.page!._id, data.key).subscribe(v => {
      if (v.code === 0) {
        this.pages.refresh.next(true);
        this.message.success('字段移除成功');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
