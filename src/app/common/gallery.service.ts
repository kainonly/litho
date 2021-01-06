import { Injectable } from '@angular/core';
import { BitHttpService } from 'ngx-bit';
import { Observable } from 'rxjs';

@Injectable()
export class GalleryService {
  private model = 'gallery';

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

  add(data: any): Observable<any> {
    return this.http.add(this.model, data);
  }

  edit(data: any): Observable<any> {
    return this.http.edit(this.model, data);
  }

  delete(id: any[]): Observable<any> {
    return this.http.delete(this.model, id);
  }
}
