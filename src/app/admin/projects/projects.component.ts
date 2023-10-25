import { Component, OnInit } from '@angular/core';

import { Cluster } from '@common/models/cluster';
import { Project } from '@common/models/project';
import { ClustersService } from '@common/services/clusters.service';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AuthorizationComponent, AuthorizationInput } from './authorization/authorization.component';
import { ControlComponent } from './control/control.component';
import { FormComponent, FormInput } from './form/form.component';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  model!: WpxModel<Project>;
  clusterDict: Record<string, AnyDto<Cluster>> = {};

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private drawer: NzDrawerService,
    private message: NzMessageService,
    private projects: ProjectsService,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<Project>('projects', this.projects);
    this.model.ready().subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(() => {
      console.debug('fetch:ok');
      this.getClusters(
        this.model
          .data()
          .filter(v => v.cluster)
          .map(v => v.cluster!)
      );
      // this.openControl(this.model.data()[0]);
    });
  }

  getClusters(ids: string[]): void {
    this.clusters
      .find(
        {
          _id: { $in: ids }
        },
        {
          xfilter: { '_id->$in': 'oids' }
        }
      )
      .subscribe(({ data }) => {
        data.forEach(v => (this.clusterDict[v._id] = v));
      });
  }

  openForm(doc?: AnyDto<Project>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  openAuthorization(doc: AnyDto<Project>): void {
    this.modal.create<AuthorizationComponent, AuthorizationInput>({
      nzTitle: `设置【${doc.name}】`,
      nzContent: AuthorizationComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  openControl(doc: AnyDto<Project>): void {
    this.drawer.create({
      nzContent: ControlComponent,
      nzContentParams: {
        doc,
        updated: () => {
          this.getData();
        }
      },
      nzClosable: false,
      nzWidth: 800
    });
  }

  delete(doc: AnyDto<Project>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些项目吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects
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
