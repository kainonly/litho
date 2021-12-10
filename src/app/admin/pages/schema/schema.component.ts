import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

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
    this.fieldList = [...this.fieldList];
    this.pages
      .fieldSort(
        this.page!._id,
        this.fieldList.map(v => v.key)
      )
      .subscribe(v => {
        if (v.code === 0) {
          this.message.success('字段排序刷新成功');
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
  }
}
