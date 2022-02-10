import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Value } from '@weplanx/common';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  ref(model: string, target = '_id'): Observable<Value[]> {
    return this.http
      .get<any[]>(`api/${model}`)
      .pipe(map<any[], Value[]>(data => data.map(v => ({ label: v.name, value: v[target] }))));
  }
}
