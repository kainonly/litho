import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../base/http.service';

@Injectable()
export class OriginListsService {
  private action = '/originLists';

  constructor(private http: HttpService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, condition: any[] = [], like: any = []): Observable<any> {
    return this.http.req(model + this.action, {
      where: condition,
      like: like
    });
  }
}
