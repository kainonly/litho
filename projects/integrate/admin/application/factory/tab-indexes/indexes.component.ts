import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesSerivce } from '../pages.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-factory-indexes',
  templateUrl: './indexes.component.html'
})
export class IndexesComponent implements OnInit {
  indexesList: any[] = [];

  constructor(private pages: PagesSerivce, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.pages.getIndexes().subscribe(data => {
      this.indexesList = [...data];
    });
  }

  form(): void {
    this.modal.create({
      nzTitle: '新增索引',
      nzContent: FormComponent,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(index: string): void {
    this.pages.deleteIndex(index).subscribe(v => {
      this.getData();
      this.message.success('索引删除成功');
    });
  }
}
