import { Injectable } from '@angular/core';

import { Cluster } from '@common/models/cluster';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ClustersService extends WpxApi<Cluster> {
  protected override collection = 'clusters';
}
