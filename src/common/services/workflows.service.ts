import { Injectable } from '@angular/core';

import { Workflow } from '@common/models/workflow';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class WorkflowsService extends WpxApi<Workflow> {
  protected override collection = 'workflows';
}
