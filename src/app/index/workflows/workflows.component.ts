import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Endpoint } from '@common/models/endpoint';
import { Workflow } from '@common/models/workflow';
import { EndpointsService } from '@common/services/endpoints.service';
import { WorkflowsService } from '@common/services/workflows.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ControlComponent } from './control/control.component';
import { FormComponent, FormInput } from './form/form.component';

@Component({
  selector: 'app-index-workflows',
  templateUrl: './workflows.component.html'
})
export class WorkflowsComponent implements OnInit {
  model!: WpxModel<Workflow>;
  endpointDict: Record<string, AnyDto<Endpoint>> = {};

  constructor(
    private app: AppService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private workflows: WorkflowsService,
    private endpoints: EndpointsService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<Workflow>('workflows', this.workflows);
    this.model.ready({ project: 'oid' }).subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model
      .fetch({
        project: this.app.contextData!._id
      })
      .subscribe(({ data }) => {
        this.getEndpoints(data.filter(v => v.schedule).map(v => v.schedule!.ref));
      });
  }

  getEndpoints(ids: string[]): void {
    this.endpoints
      .find(
        { _id: { $in: ids } },
        {
          xfilter: { '_id->$in': 'oids' }
        }
      )
      .subscribe(({ data }) => {
        data.forEach(v => (this.endpointDict[v._id] = v));
      });
  }

  openForm(doc?: AnyDto<Workflow>): void {
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

  openControl(doc: AnyDto<Workflow>, tabIndex: number): void {
    this.drawer.create({
      nzClosable: false,
      nzContent: ControlComponent,
      nzContentParams: {
        tabIndex,
        doc,
        updated: () => {
          this.getData();
        }
      },
      nzWidth: 960
    });
  }

  delete(doc: AnyDto<Workflow>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.workflows.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些工作流吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.workflows
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
