import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitHttpService } from 'ngx-bit';

@Injectable()
export class AdminService {
  private model = 'admin';

  constructor(
    private http: BitHttpService
  ) {
  }

  originLists(): Observable<any> {
    return this.http.originLists(this.model);
  }

  lists(search: any, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, search, {
      refresh,
      persistence
    });
  }

  get(id: number) {
    return this.http.get(this.model, id);
  }

  add(data: any) {
    return this.http.add(this.model, data);
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
   * Validate Username
   */
  validedUsername(username: string) {
    return this.http.req(this.model + '/validedUsername', {
      username
    });
  }
}
