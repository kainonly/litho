import { Component, OnInit } from '@angular/core';

import { Schedule } from '@common/models/schedule';
import { SchedulesService } from '@common/services/schedules.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-workflows-schedules',
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent implements OnInit {
  items: AnyDto<Schedule>[] = [];
  statusDict: Record<string, boolean> = {};
  activated?: AnyDto<Schedule>;

  constructor(
    private schedules: SchedulesService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.schedules.find({}).subscribe(({ data }) => {
      this.items = [...data];
      this.items.forEach(v => this.getPing(v.node_id));
    });
  }

  getPing(node_id: string): void {
    this.schedules.ping(node_id).subscribe(() => {
      this.statusDict[node_id] = true;
    });
  }

  openActions($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<Schedule>): void {
    this.activated = data;
    this.contextMenu.create($event, menu);
  }

  openForm(doc?: AnyDto<Schedule>): void {
    this.modal.create<FormComponent, ModalData>({
      nzTitle: !doc ? '创建' : `编辑【${doc.name}】`,
      nzWidth: 640,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(doc: AnyDto<Schedule>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.schedules.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData();
        });
      },
      nzCancelText: `再想想`
    });
  }
}
