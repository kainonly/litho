import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';

import { Schedule } from '@common/models/schedule';
import { SchedulesService } from '@common/services/schedules.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormInput } from './form/form.component';
import { KeysComponent } from './keys/keys.component';

@Component({
  selector: 'app-admin-workflows-schedules',
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent implements OnInit, OnDestroy {
  model!: WpxModel<Schedule>;
  pingDict: Record<string, boolean> = {};

  private refresh!: Subscription;

  constructor(
    private wpx: WpxService,
    private schedules: SchedulesService,
    private modal: NzModalService,
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel('schedules', this.schedules);
    this.model.ready().subscribe(() => {
      this.getData(true);
      this.refresh = timer(500, 5000)
        .pipe(switchMap(() => this.schedules.ping(this.model.data().map(v => v.node))))
        .subscribe(data => {
          this.pingDict = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(({ data }) => {
      console.debug('fetch', data);
    });
  }

  openForm(doc?: AnyDto<Schedule>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `更新【${doc.name}】`,
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

  openKeys(doc: AnyDto<Schedule>): void {
    this.drawer.create({
      nzClosable: false,
      nzWidth: 600,
      nzContent: KeysComponent,
      nzContentParams: {
        doc
      }
    });
  }

  delete(doc: AnyDto<Schedule>): void {
    this.modal.confirm({
      nzTitle: `您确定要断开【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.schedules.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定断开这些服务接入吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const ids = [...this.model.selection.keys()];
        this.schedules
          .bulkDelete(
            { _id: { $in: ids } },
            {
              xfilter: { '_id->$in': 'oids' }
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
