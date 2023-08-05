import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ExporterName } from './types';

@Injectable()
export class ObservabilityService {
  interval = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}

  setInterval(v: number): void {
    this.interval.next(v);
  }

  exporter<T>(name: ExporterName): Observable<T> {
    return this.http.get<T>(`observability/${name}`);
  }
}
