import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { Cluster, ClusterNode } from '@common/models/cluster';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ClustersService extends WpxApi<Cluster> {
  protected override collection = 'clusters';
  context = signal('');

  getNodes(id: string): Observable<ClusterNode[]> {
    return this.http.get<ClusterNode[]>(`clusters/${id}/nodes`);
  }
}
