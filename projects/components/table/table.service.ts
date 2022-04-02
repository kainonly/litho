import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WpxTableService {
  constructor(private http: HttpClient) {}

  /**
   * @param model
   * @param ids
   * @param target 引用目标名称
   */
  references(model: string, ids: string[], target: string): Observable<any> {
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('id', id);
    }
    params = params.append('field', '_id').append('field', target);
    return this.http.get<any>(`api/${model}`, {
      params
    });
  }
}
