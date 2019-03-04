import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ConfigService} from './config.service';


@Injectable()
export class HttpService {
  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  static interceptor(res: any): Observable<any> {
    return of(res);
  }

  /**
   * httpClient
   */
  req(url: string, body: any = {}, method = 'post'): Observable<any> {
    const httpClient = this.http.request(method, this.config.origin + this.config.namespace + '/' + url, {
      body,
      withCredentials: this.config.withCredentials
    });
    return !this.config.httpInterceptor ? httpClient : httpClient.pipe(
      switchMap(res => HttpService.interceptor(res))
    );
  }
}
