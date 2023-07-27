import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Any, AnyDto, Filter, WpxModel, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { OrdersService } from '../orders.service';
import { Order } from '../types';

@Component({
  selector: 'app-exp-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @ViewChild('valid') valid!: TemplateRef<{ $implicit: AnyDto<Order> }>;

  model!: WpxModel<Order>;
  form!: FormGroup;
  filter: Filter<Order> = {};

  constructor(
    private wpx: WpxService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    public orders: OrdersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      no: [],
      name: [],
      account: []
    });
    this.model = this.wpx.setModel<Order>('exp', this.orders);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch(this.filter).subscribe(() => {
      console.debug('fetch:ok');
    });
  }

  clear(): void {
    this.form.reset();
    this.filter = {};
    this.getData();
  }

  search(data: Any): void {
    for (const [k, v] of Object.entries(data)) {
      if (v) {
        this.filter[k] = { $regex: `${v}` };
      }
    }
    this.getData();
  }

  open(doc?: AnyDto<Order>): void {
    this.modal.create({
      nzTitle: !doc ? '创建' : `编辑【${doc.no}】`,
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

  delete(doc: AnyDto<Order>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.email}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.orders.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些用户吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.orders
          .bulkDelete(
            {
              _id: { $in: [...this.model.selection.keys()] }
            },
            {
              xfilter: {
                '_id.$in': 'oids'
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
