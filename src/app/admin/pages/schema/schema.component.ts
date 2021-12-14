import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Field } from '../dto/field';
import { Page } from '../dto/page';
import { FieldComponent } from '../field/field.component';
import { PagesSerivce } from '../pages.serivce';
import { fieldTypeValues } from '../values';

@Component({
  selector: 'app-admin-pages-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent {
  @Input() page?: Page;
  @Input() fieldList: Field[] = [];
  @Output() readonly changed: EventEmitter<any> = new EventEmitter<any>();
  type: Map<string, string> = new Map<string, string>([].concat(...(fieldTypeValues.map(v => v.values) as any[])));

  constructor(
    private pages: PagesSerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

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
        this.changed.next(true);
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
          this.changed.next(true);
          this.message.success('字段排序刷新成功');
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
  }

  delete(data: Field): void {
    this.pages.deleteSchemaField(this.page!._id, data.key).subscribe(v => {
      if (v.code === 0) {
        this.changed.next(true);
        this.message.success('字段移除成功');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
