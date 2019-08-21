import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {BitService} from './bit.service';

@Injectable()
export class MgoService {
  constructor(
    private http: HttpService,
    private bit: BitService
  ) {
  }

  /**
   * Mongo Lists Request
   */
  lists(model: string, action: string, filter: any = {}, refresh = false, special = false): Observable<any> {
    if (refresh) {
      this.bit.listsPageIndex = 1;
    }
    const http = this.http.req(model + '/' + action, {
      page: {
        limit: this.bit.pageLimit,
        index: this.bit.listsPageIndex
      },
      filter
    }).pipe(
      map((res) => {
        this.bit.listsTotals = !res.error ? res.data.total : 0;
        this.bit.listsLoading = false;
        this.bit.listsAllChecked = false;
        this.bit.listsIndeterminate = false;
        this.bit.listsDisabledAction = true;
        this.bit.listsCheckedNumber = 0;
        return res;
      })
    );
    return special ? http : http.pipe(
      map(res => !res.error ? res.data.lists : [])
    );
  }

  /**
   * Mongo OriginLists Request
   */
  mongoOriginLists(model: string, action: string, filter: any = {}, special = false): Observable<any> {
    const http = this.http.req(model + '/' + action, {filter});
    return special ? http : http.pipe(
      map(res => !res.error ? res.data : [])
    );
  }
}
