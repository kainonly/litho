import { Injectable } from '@angular/core';

import { Queue } from '@common/models/queue';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class QueuesService extends WpxApi<Queue> {
  protected override collection = 'queues';
}
