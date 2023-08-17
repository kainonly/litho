import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClusterNode } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';

@Component({
  selector: 'app-admin-clusters-kubernetes-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  nodes: ClusterNode[] = [];

  constructor(
    private route: ActivatedRoute,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.clusters.context.set(data['id']);
      this.getNodes(data['id']);
    });
  }

  getNodes(id: string): void {
    this.clusters.getNodes(id).subscribe(data => {
      this.nodes = [...data];
      console.log(this.nodes);
    });
  }
}
