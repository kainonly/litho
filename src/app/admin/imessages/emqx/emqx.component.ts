import { Component, OnInit } from '@angular/core';

import { EmqxNode } from '@common/models/imessage';
import { ImessagesService } from '@common/services/imessages.service';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-imessages-emqx',
  templateUrl: './emqx.component.html'
})
export class EmqxComponent implements OnInit {
  nodes: EmqxNode[] = [];

  constructor(
    private modal: NzModalService,
    private imessages: ImessagesService
  ) {}

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes(): void {
    this.imessages.getNodes().subscribe(data => {
      this.nodes = [...data];
    });
  }

  openForm(): void {
    this.modal.create<FormComponent>({
      nzTitle: `EMQX 配置`,
      nzContent: FormComponent,
      nzOnOk: () => {}
    });
  }
}
