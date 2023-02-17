import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SessionsService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`sessions`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`sessions/${id}`);
  }

  clear(): Observable<any> {
    return this.http.delete(`sessions`);
  }
}
