import { Injectable } from '@angular/core';
import { BitHttpService } from 'ngx-bit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class VideoService {
  private model = 'video';

  constructor(
    private http: BitHttpService
  ) {
  }

  lists(search: any, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, search, {
      refresh,
      persistence
    });
  }

  bulkAdd(data: any): Observable<any> {
    return this.http.req(this.model + '/bulkAdd', data);
  }

  edit(data: any): Observable<any> {
    return this.http.edit(this.model, data);
  }

  bulkEdit(data: any): Observable<any> {
    return this.http.req(this.model + '/bulkEdit', data);
  }

  delete(id: any[]): Observable<any> {
    return this.http.delete(this.model, id);
  }

  count(): Observable<any> {
    return this.http.req(this.model + '/count').pipe(
      map(res => !res.error ? res.data : null)
    );
  }
}
