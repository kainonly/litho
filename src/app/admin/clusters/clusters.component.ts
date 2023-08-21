import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cluster, ClusterInfo } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { AnyDto, Filter } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-clusters',
  templateUrl: './clusters.component.html'
})
export class ClustersComponent implements OnInit {
  context = '';
  items: AnyDto<Cluster>[] = [];
  itemDict: Record<string, AnyDto<Cluster> & ClusterInfo> = {};

  searchText = '';
  actived?: AnyDto<Cluster>;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    public clusters: ClustersService,
    private router: Router,
    private route: ActivatedRoute,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.context = data['id'] ?? '';
      this.getData();
    });
  }

  getData(): void {
    const filter: Filter<Cluster> = {};
    if (this.searchText) {
      filter.name = { $regex: '^' + this.searchText };
    }

    this.clusters.find(filter, { pagesize: 1000 }).subscribe(({ data }) => {
      this.items = [...data];
      this.items.forEach(value => {
        this.getInfo(value);
      });
    });
  }

  getInfo(value: AnyDto<Cluster>): void {
    this.clusters.getInfo(value._id).subscribe(data => {
      console.log(data);
      this.itemDict[value._id] = {
        ...value,
        ...data
      };
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  open(context: string): void {
    this.router.navigate(['/admin', 'clusters', context, 'nodes']);
  }

  openMenu($event: MouseEvent, data: AnyDto<Cluster>, menu: NzDropdownMenuComponent): void {
    this.actived = data;
    this.contextMenu.create($event, menu);
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
