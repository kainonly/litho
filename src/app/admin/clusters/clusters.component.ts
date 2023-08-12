import { Component, OnInit } from '@angular/core';

import { Cluster } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-clusters',
  templateUrl: './clusters.component.html'
})
export class ClustersComponent implements OnInit {
  model!: WpxModel<Cluster>;

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<Cluster>('clusters', this.clusters);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(() => {
      console.debug('fetch:ok');
    });
  }

  open(doc?: AnyDto<Cluster>): void {
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
}
