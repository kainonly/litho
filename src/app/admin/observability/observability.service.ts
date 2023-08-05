import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Any } from '@weplanx/ng';

import { ExporterName } from './types';

@Injectable()
export class ObservabilityService {
  interval = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}

  setInterval(v: number): void {
    this.interval.next(v);
  }

  exporters(name: ExporterName): Observable<Any[][]> {
    return this.http.get<Any[][]>(`observability/${name}`);
  }
}
