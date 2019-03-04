import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpService} from '../base/http.service';
import {BitService} from '../base/bit.service';

@Injectable()
export class ListsService {
  private action = '/lists';

  constructor(private http: HttpService,
              private bit: BitService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, condition: any[] = [], like: any = [], refresh?: boolean): Observable<any> {
    if (refresh) {
      this.bit.listsPageIndex = 1;
    }
    return this.http
      .req(model + this.action, {
        page: {
          limit: this.bit.pageLimit,
          index: this.bit.listsPageIndex
        },
        where: condition,
        like
      })
      .pipe(
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
  }
}
