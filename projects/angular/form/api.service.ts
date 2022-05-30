import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Value } from '@weplanx/ng';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * 获取引用信息
   * @param model
   * @param target
   */
  getReference(model: string, target: string): Observable<Value[]> {
    return this.http.get<any[]>(`api/${model}`).pipe(
      map<any[], Value[]>(v =>
        v.map(v => ({
          label: v[target] ?? `未定义 [${v._id}]`,
          value: v._id
        }))
      )
    );
  }
}
