import { Injectable } from '@angular/core';

import { Operates } from '@common/models/operates';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class OperatesService extends WpxApi<Operates> {
  protected override collection = 'logset_operates';
}
