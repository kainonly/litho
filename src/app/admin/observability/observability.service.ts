import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Any } from '@weplanx/ng';

@Injectable()
export class ObservabilityService {
  interval = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}

  setInterval(v: number): void {
    this.interval.next(v);
  }

  getCgoCalls(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/cgo_calls');
  }

  getMongoUptime(): Observable<{ value: number }> {
    return this.http.get<{ value: number }>('observability/mongo_uptime');
  }

  getMongoAvailableConnections(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_available_connections');
  }

  getMongoOpenConnections(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_open_connections');
  }

  getMongoCommandsPerSecond(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_commands_per_second');
  }

  getMongoQueryOperations(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_query_operations');
  }

  getMongoDocumentOperations(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_document_operations');
  }

  getMongoFlushes(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_flushes');
  }

  getMongoNetworkIO(): Observable<Any[][]> {
    return this.http.get<Any[][]>('observability/mongo_network_io');
  }
}
