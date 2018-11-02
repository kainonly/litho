import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
