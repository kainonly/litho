import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityService {
  constructor(private http: HttpClient) {}
  /**
   * 获取会话
   */
  getSessions(): Observable<any> {
    return this.http.get('sessions');
  }

  /**
   * 删除所有会话
   */
  deleteSessions(): Observable<any> {
    return this.http.delete(`sessions`);
  }

  /**
   * 删除会话
   * @param id
   */
  deleteSession(id: string): Observable<any> {
    return this.http.delete(`sessions/${id}`);
  }
}
