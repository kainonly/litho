import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ConfigService} from './config.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  req(url: string, body: any = {}): Observable<any> {
    const http = this.http.post(this.config.origin + this.config.namespace + '/' + url, body, {
      withCredentials: this.config.with_credentials
    });
    if (!this.config.http_customize) {
      return http;
    } else {
      return http.pipe(
        switchMap(res => this.customize(res))
      );
    }
  }

  customize(res: any): Observable<any> {
    return of(res);
  }
}
