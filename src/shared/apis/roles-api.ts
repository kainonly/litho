import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { R, Role, RoleStrategy } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class RolesApi extends Api<Role> {
  override collection = 'roles';

  sort(ids: string[]): Observable<R> {
    return this.http.post<R>(`${this.collection}/sort`, { ids });
  }

  setStrategy(id: string, strategy: RoleStrategy): Observable<R> {
    return this.http.post<R>(`${this.collection}/set_strategy`, { id, strategy });
  }
}
