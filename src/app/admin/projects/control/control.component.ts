import { Component, Input, OnInit } from '@angular/core';

import { Cluster } from '@common/models/cluster';
import { Project, TenantsResult } from '@common/models/project';
import { ClustersService } from '@common/services/clusters.service';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ClusterComponent } from '../cluster/cluster.component';

@Component({
  selector: 'app-admin-projects-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Project>;
  @Input({ required: true }) updated!: () => void;

  tenants!: TenantsResult;
  cluster?: AnyDto<Cluster>;

  constructor(
    private modal: NzModalService,
    private clusters: ClustersService,
    private projects: ProjectsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getCluster();
    this.getTenants();
  }

  getCluster(): void {
    if (this.doc.cluster) {
      this.clusters.findById(this.doc.cluster).subscribe(data => {
        this.cluster = data;
      });
    }
  }

  getTenants(): void {
    this.projects.getTenants(this.doc._id).subscribe(data => {
      this.tenants = data;
      console.log(this.tenants);
    });
  }

  openCluster(): void {
    this.modal.create<ClusterComponent, AnyDto<Project>>({
      nzTitle: `接入集群`,
      nzContent: ClusterComponent,
      nzData: this.doc,
      nzOnOk: () => {
        this.getCluster();
        this.updated();
      }
    });
  }

  deployNats(): void {
    this.projects.deployNats(this.doc._id).subscribe(() => {
      this.message.success(`正在配置租户，请稍后刷新`);
    });
  }
}
