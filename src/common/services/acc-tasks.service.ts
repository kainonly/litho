import { Injectable } from '@angular/core';

import { AccTask } from '@common/models/acc-task';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AccTasksService extends WpxApi<AccTask> {
  protected override collection = 'acc_tasks';
}
