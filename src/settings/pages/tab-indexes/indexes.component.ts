import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../pages.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'settings-pages-indexes',
  templateUrl: './indexes.component.html'
})
export class IndexesComponent implements OnInit {
  key!: string;
  indexesList: any[] = [];

  constructor(
    private pages: PagesSerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.key = v.key;
      this.pages.key$.next(v.key);
      this.getData();
    });
  }

  getData(): void {
    this.pages.findIndexes(this.key).subscribe(data => {
      this.indexesList = [...data];
    });
  }

  form() {
    this.modal.create({
      nzTitle: '创建索引到该内容类型',
      nzContent: FormComponent,
      nzComponentParams: {
        key: this.key
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(name: string): void {
    this.pages.deleteIndex(this.key, name).subscribe(v => {
      if (v.code === 0) {
        this.getData();
        this.message.success('索引移除成功');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
