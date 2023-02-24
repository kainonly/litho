import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CgoCallsValue } from './types';

@Injectable()
export class MonitorService {
  constructor(private http: HttpClient) {}

  getCgoCalls(): Observable<CgoCallsValue[]> {
    return this.http.get<CgoCallsValue[]>('monitor/cgo_calls');
  }
}
