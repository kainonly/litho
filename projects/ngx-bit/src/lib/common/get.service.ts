import {Injectable} from '@angular/core';
import {HttpService} from '../lib/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class GetService {
  private action = '/get';

  constructor(private http: HttpService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, condition: any): Observable<any> {
    if (condition.hasOwnProperty('id')) {
      return this.http.req(model + this.action, condition);
    } else {
      return this.http.req(model + this.action, {
        where: condition
      });
    }
  }
}
