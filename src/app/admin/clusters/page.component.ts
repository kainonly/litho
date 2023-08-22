import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cluster } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { AnyDto } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-clusters-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  context!: string;
  data?: AnyDto<Cluster>;

  constructor(
    private route: ActivatedRoute,
    private clusters: ClustersService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.context = data['id'];
      this.getData();
    });
  }

  getData(): void {
    this.clusters.findById(this.context).subscribe(data => {
      this.data = data;
    });
  }
}
