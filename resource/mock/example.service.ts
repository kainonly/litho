import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitCurdCommonService } from 'ngx-bit';

@Injectable()
export class ExampleService {
  private model = 'example';

  constructor(private curd: BitCurdCommonService) {}

  originLists(type: number): Observable<any> {
    return this.curd.originLists(this.model, [{ field: 'type', op: '=', value: type }]);
  }

  lists(search: any, refresh: boolean, persistence: boolean): Observable<any> {
    return this.curd.lists(this.model, search, {
      refresh,
      persistence
    });
  }

  get(id: number): Observable<any> {
    return this.curd.get(this.model, id);
  }

  getFromUsername(username: string): Observable<any> {
    return this.curd.get(this.model, [{ field: 'username', op: '=', value: username }]);
  }

  add(data: any): Observable<any> {
    return this.curd.add(this.model, data);
  }

  edit(data: any): Observable<any> {
    return this.curd.edit(this.model, data);
  }

  editFormUsername(username: string, data: any): Observable<any> {
    return this.curd.edit(this.model, data, [{ field: 'username', op: '=', value: username }]);
  }

  status(data: any): Observable<any> {
    return this.curd.status(this.model, data);
  }

  work(data: any, key: string): Observable<any> {
    return this.curd.status(this.model, data, 'work', {
      key
    });
  }

  delete(id: any[]): Observable<any> {
    return this.curd.delete(this.model, id);
  }

  deleteFormUsername(username: string): Observable<any> {
    return this.curd.delete(this.model, undefined, [{ field: 'username', op: '=', value: username }]);
  }

  deleteNothing(): Observable<any> {
    return this.curd.delete(this.model);
  }
}
