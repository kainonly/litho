import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { State, Workflow } from '@common/models/workflow';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class WorkflowsService extends WpxApi<Workflow> {
  protected override collection = 'workflows';

  sync(id: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/sync`, { id });
  }

  state(id: string): Observable<State> {
    return this.http.post<State>(`${this.collection}/state`, { id });
  }
}
