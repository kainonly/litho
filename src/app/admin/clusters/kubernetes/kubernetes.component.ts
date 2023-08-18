import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cluster } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-clusters-kubernetes',
  templateUrl: './kubernetes.component.html'
})
export class KubernetesComponent implements OnInit {
  items: AnyDto<Cluster>[] = [];
  itemDict: Record<string, AnyDto<Cluster>> = {};
  context = '';

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    public clusters: ClustersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.firstChild!.params.subscribe(data => {
      this.context = data['id'] ?? '';
      this.getData();
    });
  }

  getData(): void {
    this.clusters
      .find(
        { kind: 'kubernetes' },
        {
          pagesize: 1000
        }
      )
      .subscribe(({ data }) => {
        this.items = [...data];
        this.items.forEach(value => (this.itemDict[value._id] = value));
      });
  }

  open(): void {
    const params: Any = {};
    if (this.context) {
      params['id'] = this.context;
    }
    this.router.navigate(['/admin', 'clusters', 'kubernetes', 'nodes', params]);
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
        this.getData();
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
          this.getData();
        });
      },
      nzCancelText: `再想想`
    });
  }
}
