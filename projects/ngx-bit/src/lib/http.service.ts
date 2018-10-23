import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ConfigService} from './config.service';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  req(url: string, body: any = {}): Observable<any> {
    return this.http.post(this.config.origin + this.config.namespace + '/' + url, body, {
      withCredentials: this.config.withCredentials
    });
  }
}
