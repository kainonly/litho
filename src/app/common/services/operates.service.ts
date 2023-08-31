import { Injectable } from '@angular/core';

import { Operate } from '@common/models/operate';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class OperatesService extends WpxApi<Operate> {
  protected override collection = 'logset_operates';
}
