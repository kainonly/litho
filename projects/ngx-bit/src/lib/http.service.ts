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

  /**
   * Http Request Tools
   */
  req(url: string, body: any = {}, method = 'post'): Observable<any> {
    const _http = this.http.request(method, this.config.origin + this.config.namespace + '/' + url, {
      body: body,
      withCredentials: this.config.with_credentials
    });
    return !this.config.http_customize ? _http : _http.pipe(
      switchMap(res => this.customize(res))
    );
  }

  customize(res: any): Observable<any> {
    return of(res);
  }
}
