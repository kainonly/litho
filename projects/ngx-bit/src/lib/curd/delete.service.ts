import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../base/http.service';

@Injectable()
export class DeleteService {
  private action = '/delete';

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
