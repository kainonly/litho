import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from '../indexes/form/form.component';
import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'wpx-admin-factory-projection',
  templateUrl: './projection.component.html'
})
export class ProjectionComponent implements OnInit {
  data: any[] = [];

  constructor(private pages: PagesSerivce, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    // this.pages.getIndexes().subscribe(v => {
    //   this.data = [...v];
    // });
  }

  form(): void {
    this.modal.create({
      nzTitle: '新增规则',
      nzContent: FormComponent,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(i: number): void {
    // this.pages.deleteIndex(index).subscribe(v => {
    //   this.getData();
    //   this.message.success('规则删除成功');
    // });
  }
}
