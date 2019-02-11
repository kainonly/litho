import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../base/http.service';

@Injectable()
export class EditService {
  private action = '/edit';

  constructor(private http: HttpService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, data: any, condition: any = []): Observable<any> {
    data['switch'] = false;
    if (!condition) {
      return this.http.req(model + this.action, data);
    } else {
      return this.http.req(
        model + this.action,
        Object.assign(data, {
          where: condition
        })
      );
    }
  }
}
