import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Observable} from 'rxjs';

@Injectable()
export class StatusService {
  private action = '/edit';

  constructor(private http: HttpService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, data: any): Observable<any> {
    data['switch'] = true;
    return this.http.req(model + this.action, data);
  }
}
