import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesSerivce } from '../pages.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-resources-factory-pages-indexes',
  templateUrl: './indexes.component.html'
})
export class IndexesComponent implements OnInit {
  indexesList: any[] = [];

  constructor(private pages: PagesSerivce, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.pages.findIndexes(this.pages.key!).subscribe(data => {
      this.indexesList = [...data];
    });
  }

  form(): void {
    this.modal.create({
      nzTitle: '创建索引到该内容类型',
      nzContent: FormComponent,
      nzComponentParams: {
        key: this.pages.key!
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(name: string): void {
    this.pages.deleteIndex(this.pages.key!, name).subscribe(v => {
      this.getData();
      this.message.success('索引移除成功');
    });
  }
}
