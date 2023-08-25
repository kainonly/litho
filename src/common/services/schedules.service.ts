import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Schedule } from '@common/models/schedule';
import { Any, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class SchedulesService extends WpxApi<Schedule> {
  protected override collection = 'schedules';

  ping(ids: string[]): Observable<Any> {
    return this.http.post(`${this.collection}/ping`, { ids });
  }

  deploy(id: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/deploy`, { id });
  }

  undeploy(id: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/undeploy`, { id });
  }

  revoke(id: string, key: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/revoke`, { id, key });
  }
}
