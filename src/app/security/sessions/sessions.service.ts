import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SessionsService {
  constructor(private http: HttpClient) {}
  /**
   * 获取会话
   */
  get(): Observable<any> {
    return this.http.get(`sessions`);
  }

  /**
   * 删除会话
   * @param id
   */
  delete(id: string): Observable<any> {
    return this.http.delete(`sessions/${id}`);
  }

  /**
   * 删除所有会话
   */
  clear(): Observable<any> {
    return this.http.delete(`sessions`);
  }
}
