import {Injectable} from '@angular/core';
import {HttpService} from 'dev-ngx-bit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CenterService {
  constructor(private http: HttpService) {
  }

  /**
   * 登出
   */
  clear(): Observable<boolean> {
    return this.http.req('center/clear').pipe(map(res => {
      return !res.error;
    }));
  }

  /**
   * 获取个人信息
   */
  information(): Observable<any> {
    return this.http.req('center/information').pipe(map(res => {
      if (res.error) {
        return [];
      } else {
        return res.data;
      }
    }));
  }

  /**
   * 修改信息
   * @param data
   */
  modify(data: any): Observable<any> {
    return this.http.req('center/modify', data);
  }
}
