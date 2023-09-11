import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cluster, ClusterInfo } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ControlsComponent } from './controls/controls.component';
import { FormComponent, FormInput } from './form/form.component';

@Component({
  selector: 'app-admin-clusters',
  templateUrl: './clusters.component.html'
})
export class ClustersComponent implements OnInit {
  model!: WpxModel<Cluster>;
  infos: Record<string, ClusterInfo> = {};

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    public clusters: ClustersService,
    private router: Router,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<Cluster>('clusters', this.clusters);
    this.model.ready().subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(({ data }) => {
      data.forEach(value => this.getInfo(value));
      console.debug('fetch:ok');
    });
  }

  getInfo(value: AnyDto<Cluster>): void {
    this.clusters.getInfo(value._id).subscribe(data => {
      this.infos[value._id] = data;
    });
  }

  open(context: string): void {
    this.router.navigate(['/admin', 'clusters', context, 'nodes']);
  }

  openControls(doc: AnyDto<Cluster>): void {
    this.drawer.create({
      nzClosable: false,
      nzContent: ControlsComponent,
      nzContentParams: {
        data: doc
      },
      nzWidth: 1200
    });
  }

  openForm(doc?: AnyDto<Cluster>): void {
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

  delete(doc: AnyDto<Cluster>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.clusters.delete(doc._id).subscribe(() => {
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
        this.clusters
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
