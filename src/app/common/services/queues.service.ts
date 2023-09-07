import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Queue, QueueInfo } from '@common/models/queue';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class QueuesService extends WpxApi<Queue> {
  protected override collection = 'queues';

  sync(id: string): Observable<void> {
    return this.http.post<void>(`${this.collection}/sync`, { id });
  }

  destroy(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.collection}/destroy`, { ids });
  }

  info(id: string): Observable<QueueInfo> {
    return this.http.get<QueueInfo>(`${this.collection}/${id}/info`);
  }
}
