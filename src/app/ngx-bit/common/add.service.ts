import {Injectable} from '@angular/core';
import {HttpService} from '../lib/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class AddService {
  private action = '/add';

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
   * TODO:生成新增请求
   * @param model 模型名称
   * @param data 请求数据
   */
  factory(model: string, data: any): Observable<any> {
    return this.http.req(model + this.action, data);
  }
}
