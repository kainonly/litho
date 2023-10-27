import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';

import { Endpoint } from '@common/models/endpoint';
import { EndpointsService } from '@common/services/endpoints.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormInput } from './form/form.component';
import { ScheduleComponent } from './schedule/schedule.component';

@Component({
  selector: 'app-admin-endpoints',
  templateUrl: './endpoints.component.html'
})
export class EndpointsComponent implements OnInit, OnDestroy {
  model!: WpxModel<Endpoint>;
  kind: Record<string, string> = {
    schedule: '定时调度器',
    emqx: 'EMQX'
  };

  pingDict: Record<string, boolean> = {};
  private refresh!: Subscription;

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private endpoints: EndpointsService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<Endpoint>('endpoints', this.endpoints);
    this.model.ready().subscribe(() => {
      this.getData();
      this.refresh = timer(500, 5000)
        .pipe(
          switchMap(() =>
            this.endpoints.schedulePing(
              this.model
                .data()
                .filter(v => v.kind === 'schedule')
                .map(v => v.schedule!.node)
            )
          )
        )
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
    this.model.fetch({}).subscribe(() => {});
  }

  open(context: string): void {
    this.router.navigate(['/admin', 'clusters', context, 'nodes']);
  }

  openForm(doc?: AnyDto<Endpoint>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `编辑【${doc.name}】`,
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

  openSchedule(doc: AnyDto<Endpoint>): void {
    this.drawer.create({
      nzClosable: false,
      nzContent: ScheduleComponent,
      nzContentParams: {
        doc
      },
      nzWidth: 800
    });
  }

  delete(doc: AnyDto<Endpoint>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.endpoints.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些集群吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.endpoints
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
