import { Injectable } from '@angular/core';
import { BitHttpService } from 'ngx-bit';
import { Observable } from 'rxjs';

@Injectable()
export class AudioTypeService {
  private model = 'audio_type';

  constructor(
    private http: BitHttpService
  ) {
  }

  originLists(): Observable<any> {
    return this.http.originLists(this.model);
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

  sort(data: any[]): Observable<any> {
    return this.http.req(this.model + '/sort', {
      data
    });
  }
}
