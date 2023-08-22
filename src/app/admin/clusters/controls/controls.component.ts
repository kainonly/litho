import { Component, Input, OnInit } from '@angular/core';

import { Cluster, ClusterNode } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { Any, AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-admin-clusters-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent implements OnInit {
  @Input({ required: true }) data!: AnyDto<Cluster>;
  index = 0;
  nodes: ClusterNode[] = [];
  ingresses: Any[] = [];

  constructor(private clusters: ClustersService) {}

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes(): void {
    this.clusters.getNodes(this.data._id).subscribe(data => {
      this.nodes = [...data];
    });
  }
}
