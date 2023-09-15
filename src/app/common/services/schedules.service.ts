import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Schedule, ScheduleState } from '@common/models/schedule';
import { Any, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class SchedulesService extends WpxApi<Schedule> {
  protected override collection = 'schedules';

  keys(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.collection}/${id}/keys`);
  }

  ping(nodes: string[]): Observable<Any> {
    return this.http.post(`${this.collection}/ping`, { nodes });
  }

  revoke(id: string, key: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/revoke`, { id, key });
  }

  state(node: string, key: string): Observable<ScheduleState> {
    return this.http.post<ScheduleState>(`${this.collection}/state`, { node, key });
  }
}
