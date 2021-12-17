import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'app-admin-pages-indexes',
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
      console.log(data);
      this.indexesList = [...data];
    });
  }

  form() {
    this.modal.create({
      nzTitle: '创建索引到该内容类型',
      nzWidth: 800,
      // nzContent: FieldComponent,
      // nzComponentParams: {
      //   page: this.page
      // },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}
