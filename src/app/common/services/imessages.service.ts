import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmqxNode, Imessage } from '@common/models/imessage';
import { Any, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ImessagesService extends WpxApi<Imessage> {
  protected override collection = 'imessages';

  getNodes(): Observable<EmqxNode[]> {
    return this.http.get<EmqxNode[]>(`${this.collection}/nodes`);
  }

  getMetrics(id: string): Observable<Any> {
    return this.http.get(`${this.collection}/${id}/metrics`);
  }

  createMetrics(id: string): Observable<Any> {
    return this.http.put(`${this.collection}/${id}/metrics`, {});
  }

  deleteMetrics(id: string): Observable<Any> {
    return this.http.delete(`${this.collection}/${id}/metrics`);
  }
}
