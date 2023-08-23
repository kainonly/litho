import { Component, OnInit } from '@angular/core';

import { Workflow } from '@common/models/workflow';
import { WorkflowsService } from '@common/services/workflows.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';
import { SchedulesComponent } from './schedules/schedules.component';

@Component({
  selector: 'app-admin-workflows',
  templateUrl: './workflows.component.html'
})
export class WorkflowsComponent implements OnInit {
  model!: WpxModel<Workflow>;

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private workflows: WorkflowsService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<Workflow>('workflows', this.workflows);
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
    });
  }

  openForm(doc?: AnyDto<Workflow>): void {
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

  openSchedules(): void {
    this.drawer.create({
      nzClosable: false,
      nzContent: SchedulesComponent,
      nzWidth: 800
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
}
