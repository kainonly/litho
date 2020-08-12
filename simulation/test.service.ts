import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitHttpService } from 'ngx-bit';

@Injectable()
export class TestService {
  private model = 'test';

  constructor(
    private http: BitHttpService
  ) {
  }

  originLists(type: number): Observable<any> {
    return this.http.originLists(this.model, [
      { field: 'type', op: '=', value: type }
    ]);
  }

  lists(search: any, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, search, {
      refresh,
      persistence
    });
  }

  get(id: number): Observable<any> {
    return this.http.get(this.model, id);
  }

  getFromUsername(username: string): Observable<any> {
    return this.http.get(this.model, [
      { field: 'username', op: '=', value: username }
    ]);
  }

  add(data: any): Observable<any> {
    return this.http.add(this.model, data);
  }

  edit(data: any): Observable<any> {
    return this.http.edit(this.model, data);
  }

  editFormUsername(username: string, data: any): Observable<any> {
    return this.http.edit(this.model, data, [
      { field: 'username', op: '=', value: username }
    ]);
  }

  status(data: any): Observable<any> {
    return this.http.status(this.model, data);
  }

  work(data: any, key: string): Observable<any> {
    return this.http.status(this.model, data, 'work', {
      key
    });
  }

  delete(id: any[]): Observable<any> {
    return this.http.delete(this.model, id);
  }

  deleteFormUsername(username: string): Observable<any> {
    return this.http.delete(this.model, undefined, [
      { field: 'username', op: '=', value: username }
    ]);
  }
}
