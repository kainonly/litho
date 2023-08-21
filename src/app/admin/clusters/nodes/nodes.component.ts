import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClusterNode } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';

@Component({
  selector: 'app-admin-clusters-nodes',
  templateUrl: './nodes.component.html'
})
export class NodesComponent implements OnInit {
  items: ClusterNode[] = [];

  constructor(
    private route: ActivatedRoute,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.route.parent!.parent!.params.subscribe(data => {
      if (data['id']) {
        this.getData(data['id']);
      }
    });
  }

  getData(id: string): void {
    this.clusters.getNodes(id).subscribe(data => {
      this.items = [...data];
    });
  }
}
