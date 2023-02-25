import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MonitorService {
  interval: BehaviorSubject<number> = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}

  setInterval(v: number): void {
    this.interval.next(v);
  }

  getCgoCalls(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/cgo_calls');
  }

  getMongoUptime(): Observable<{ value: number }> {
    return this.http.get<{ value: number }>('monitor/mongo_uptime');
  }

  getMongoAvailableConnections(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_available_connections');
  }

  getMongoOpenConnections(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_open_connections');
  }

  getMongoCommandsPerSecond(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_commands_per_second');
  }

  getMongoQueryOperations(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_query_operations');
  }

  getMongoDocumentOperations(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_document_operations');
  }

  getMongoFlushes(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_flushes');
  }

  getMongoNetworkIO(): Observable<unknown[][]> {
    return this.http.get<unknown[][]>('monitor/mongo_network_io');
  }
}
