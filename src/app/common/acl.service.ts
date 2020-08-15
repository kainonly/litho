import { Injectable } from '@angular/core';
import { ListByPage } from 'ngx-bit/factory';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BitHttpService } from 'ngx-bit';

@Injectable()
export class AclService {
  private model = 'acl';

  constructor(
    private http: BitHttpService
  ) {
  }

  originLists(): Observable<any> {
    return this.http.originLists(this.model);
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, factory, {
      refresh,
      persistence
    });
  }

  add(data: any) {
    return this.http.add(this.model, data);
  }

  get(id: any) {
    return this.http.get(this.model, id);
  }

  edit(data: any): Observable<any> {
    return this.http.edit(this.model, data);
  }

  delete(id: any[]): Observable<any> {
    return this.http.delete(this.model, id);
  }

  status(data: any): Observable<any> {
    return this.http.status(this.model, data);
  }

  /**
   * Validate Acl Key
   */
  validedName(name: string, edit: Observable<string> = of(null)) {
    return edit.pipe(
      switchMap(nameKey => {
        if (name !== nameKey) {
          return this.http.req(this.model + '/validedName', {
            name
          });
        }
        return of({
          error: 0,
          data: false
        });
      })
    );
  }

  /**
   * Validate Acl Key
   */
  validedKey(key: string, edit: Observable<string> = of(null)) {
    return edit.pipe(
      switchMap(editKey => {
        if (key !== editKey) {
          return this.http.req(this.model + '/validedKey', {
            key
          });
        }
        return of({
          error: 0,
          data: false
        });
      })
    );
  }
}
