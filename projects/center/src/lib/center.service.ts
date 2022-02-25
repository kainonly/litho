import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CenterService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get('center/user-info');
  }

  setUserInfo(data: any): Observable<any> {
    return this.http.patch('center/user-info', data);
  }
}
