import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Menu, R } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class MenusApi extends Api<Menu> {
  override collection = 'menus';

  sort(ids: string[]): Observable<R> {
    return this.http.post<R>(`${this.collection}/sort`, { ids });
  }
}
