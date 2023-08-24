import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Schedule } from '@common/models/schedule';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class SchedulesService extends WpxApi<Schedule> {
  protected override collection = 'schedules';

  ping(id: string): Observable<void> {
    return this.http.get<void>(`${this.collection}/${id}/ping`);
  }

  deploy(id: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/${id}/deploy`, {});
  }

  undeploy(id: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/${id}/undeploy`, {});
  }
}
