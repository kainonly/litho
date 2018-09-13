import {Injectable} from '@angular/core';
import {HttpService} from '../lib/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class GetService {
  private action = '/get';

  constructor(private http: HttpService) {
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
   */
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
