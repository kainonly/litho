import {Injectable} from '@angular/core';
import {HttpService} from '../lib/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class StatusService {
  private action = '/edit';

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
   * TODO:生成修改请求
   * @param model 模型名称
   * @param data 请求数据
   */
  factory(model: string, data: any): Observable<any> {
    data['switch'] = true;
    return this.http.req(model + this.action, data);
  }
}
