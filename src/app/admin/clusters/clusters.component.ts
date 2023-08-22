import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cluster, ClusterInfo } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

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
    private route: ActivatedRoute,
    private contextMenu: NzContextMenuService
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

  form(doc?: AnyDto<Cluster>): void {
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
