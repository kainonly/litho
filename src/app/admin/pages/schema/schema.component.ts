import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Field } from '../dto/field';
import { Page } from '../dto/page';
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
  type: Map<string, string> = new Map<string, string>([].concat(...(fieldTypeValues.map(v => v.values) as any[])));

  constructor(
    private pages: PagesSerivce,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fieldList, event.previousIndex, event.currentIndex);
    this.pages
      .sortSchemaFields(
        this.page!._id,
        this.fieldList.map(v => v.key)
      )
      .subscribe(v => {
        if (v.code === 0) {
          this.fieldList = [...this.fieldList];
          this.message.success('字段排序刷新成功');
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
  }

  delete(data: Field, i: number): void {
    this.pages.deleteSchemaField(this.page!._id, data.key).subscribe(v => {
      if (v.code === 0) {
        this.fieldList.splice(i, 1);
        this.fieldList = [...this.fieldList];
        this.message.success('字段移除成功');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
