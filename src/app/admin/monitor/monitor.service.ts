import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MonitorService {
  constructor(private http: HttpClient) {}

  getCgoCalls(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/cgo_calls');
  }
}
