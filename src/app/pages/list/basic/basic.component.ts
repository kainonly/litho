import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('addFormFooter') addFormFooter!: TemplateRef<any>;
  status = 0;
  form?: FormGroup;

  list: any[] = [
    {
      title: 'Alipay',
      avatar: '/assets/logo/alipay.png',
      description: '那是一种内在的东西，他们到达不了，也无法触及的'
    },
    {
      title: 'Angular',
      avatar: '/assets/logo/angular.png',
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的'
    },
    {
      title: 'Ant Design',
      avatar: '/assets/logo/antd.png',
      description: '生命就像一盒巧克力，结果往往出人意料'
    },
    {
      title: 'Ant Design Pro',
      avatar: '/assets/logo/antd-pro.png',
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆'
    },
    {
      title: 'Bootstrap',
      avatar: '/assets/logo/bootstrap.png',
      description: '那时候我只会想自己想要什么，从不想自己拥有什么'
    }
  ];

  constructor(private modal: NzModalService, private fb: FormBuilder) {}

  openAddForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      date: [null, [Validators.required]],
      admin: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.modal.create({
      nzTitle: '任务编辑',
      nzContent: this.addForm,
      nzFooter: this.addFormFooter
    });
  }

  submit(data: any): void {
    console.log(data);
  }
}
