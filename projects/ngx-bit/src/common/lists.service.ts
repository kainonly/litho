import {Injectable} from '@angular/core';
import {HttpService} from '../lib/http.service';
import {BitService} from '../lib/bit.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ListsService {
  private action = '/lists';

  constructor(private http: HttpService,
              private bit: BitService) {
  }

  /**
   * TODO:自定义请求函数名称
   * @param name 名称
   */
  customAction(name: string) {
    this.action = name;
  }

  /**
   * TODO:生成获取请求
   * @param model 模型名称
   * @param condition 查询条件
   * @param like 模糊查询条件
   * @param refresh 刷新
   */
  factory(model: string, condition: any[] = [], like: any = [], refresh?: boolean): Observable<any> {
    if (refresh) {
      this.bit.lists_page_index = 1;
    }
    return this.http.req(model + this.action, {
      page: {
        limit: this.bit.page_limit,
        index: this.bit.lists_page_index
      },
      where: condition,
      like: like
    }).pipe(map(res => {
      if (!res.error) {
        this.bit.lists_totals = res.data.total;
      } else {
        this.bit.lists_totals = 0;
      }
      this.bit.lists_loading = false;
      this.bit.lists_all_checked = false;
      this.bit.lists_indeterminate = false;
      this.bit.lists_disabled_action = true;
      this.bit.lists_checked_number = 0;
      return res;
    }));
  }
}
