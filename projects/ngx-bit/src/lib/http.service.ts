import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {BitService} from './bit.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient,
              private config: ConfigService,
              private bit: BitService) {
  }

  /**
   * TODO:发送请求
   */
  req(url: string, body: any = {}, jwt = true): Observable<any> {
    if (!jwt) {
      return this.client(url, body);
    } else {
      return this.bit.isLogin.pipe(
        switchMap(status => {
          if (status) {
            return this.client(url, body);
          }
        })
      );
    }
  }

  /**
   * TODO:请求对象
   */
  private client(url: string, body: any = {}): Observable<any> {
    return this.http.post(this.config.origin + url, body, {
      withCredentials: this.config.withCredentials
    });
  }
}
