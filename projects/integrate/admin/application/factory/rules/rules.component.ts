import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesSerivce } from '../pages.serivce';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-factory-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {
  data: any[] = [];

  constructor(private pages: PagesSerivce, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.pages.getPage().subscribe(v => {});
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
