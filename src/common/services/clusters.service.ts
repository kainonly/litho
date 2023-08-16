import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { Cluster } from '@common/models/cluster';
import { Any, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ClustersService extends WpxApi<Cluster> {
  protected override collection = 'clusters';
  context = signal('');

  getNodes(id: string): Observable<Any> {
    return this.http.get(`clusters/${id}/nodes`);
  }
}
