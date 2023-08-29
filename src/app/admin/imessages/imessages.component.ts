import { Component, OnInit } from '@angular/core';

import { Imessage } from '@common/models/imessage';
import { ImessagesService } from '@common/services/imessages.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormInput } from './form/form.component';

@Component({
  selector: 'app-admin-imessages',
  templateUrl: './imessages.component.html'
})
export class ImessagesComponent implements OnInit {
  model!: WpxModel<Imessage>;

  constructor(
    private wpx: WpxService,
    private imessages: ImessagesService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel('imessages', this.imessages);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(() => {
      console.debug('fetch:ok');
    });
  }

  openForm(doc?: AnyDto<Imessage>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `编辑【${doc.topic}】`,
      nzWidth: 640,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<Imessage>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.topic}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.imessages.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些主题吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.imessages
          .bulkDelete(
            {
              _id: { $in: [...this.model.selection.keys()] }
            },
            {
              xfilter: {
                '_id->$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success(`数据删除成功`);
            this.getData(true);
            this.model.setCurrentSelections(false);
          });
      },
      nzCancelText: `再想想`
    });
  }
}
