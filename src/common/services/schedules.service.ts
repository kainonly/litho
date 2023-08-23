import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Schedule } from '@common/models/schedule';
import { Any, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class SchedulesService extends WpxApi<Schedule> {
  protected override collection = 'schedules';

  ping(node_id: string): Observable<Any> {
    return this.http.get(`${this.collection}/${node_id}/ping`);
  }
}
