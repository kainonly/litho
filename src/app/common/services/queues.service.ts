import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Queue } from '@common/models/queue';
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
}
