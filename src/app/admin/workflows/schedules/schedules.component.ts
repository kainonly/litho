import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { Cluster } from '@common/models/cluster';
import { Schedule } from '@common/models/schedule';
import { ClustersService } from '@common/services/clusters.service';
import { SchedulesService } from '@common/services/schedules.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-workflows-schedules',
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent implements OnInit {
  model!: WpxModel<Schedule>;
  clusterDict: Record<string, AnyDto<Cluster>> = {};
  statusDict: Record<string, boolean> = {};

  constructor(
    private wpx: WpxService,
    private schedules: SchedulesService,
    private clusters: ClustersService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel('schedules', this.schedules);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(({ data }) => {
      console.debug('fetch', data);
      this.getClusters(data.map(v => v.cluster_id));
      data.forEach(v => this.getStatus(v._id));
    });
  }

  getClusters(ids: string[]): void {
    this.clusters.find({ _id: { $in: ids } }, { xfilter: { '_id->$in': 'oids' } }).subscribe(({ data }) => {
      data.forEach(v => (this.clusterDict[v._id] = v));
    });
  }

  getStatus(node: string): void {
    this.schedules.ping(node).subscribe(() => {
      this.statusDict[node] = true;
    });
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
        this.getData(true);
      }
    });
  }

  deploy(doc: AnyDto<Schedule>): void {
    this.schedules.deploy(doc._id).subscribe(() => {
      this.message.success(`正在执行部署请稍后刷新`);
    });
  }

  delete(doc: AnyDto<Schedule>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.schedules
          .undeploy(doc._id)
          .pipe(switchMap(() => this.schedules.delete(doc._id)))
          .subscribe(() => {
            this.message.success(`数据删除成功`);
            this.getData(true);
          });
      },
      nzCancelText: `再想想`
    });
  }
}
