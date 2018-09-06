import {Injectable} from '@angular/core';
import {AsyncSubject, Observable, Subject} from 'rxjs';
import {Communication} from './interface';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class BitService {
  /**
   * TODO:登录完成状态
   */
  private isLogin: AsyncSubject<boolean> = new AsyncSubject();
  /**
   * TODO:组件通讯事件
   */
  events: Subject<Communication> = new Subject();

  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  /**
   * TODO:更新登录状态
   */
  login() {
    this.isLogin.next(true);
    this.isLogin.complete();
  }

  /**
   * TODO:更新注销状态
   */
  logout() {
    this.isLogin.unsubscribe();
    this.isLogin = new AsyncSubject();
  }

  /**
   * TODO:发布通讯事件
   * @param message
   */
  publish(message: Communication) {
    this.events.next(message);
    this.events.complete();
  }

  /**
   * TODO:发送请求
   * @param url api路由地址
   * @param body 发送数据
   * @param jwt 是否验证jwt
   */
  req(url: string, body: any = {}, jwt = true): Observable<any> {
    if (!jwt) {
      return this.client(url, body);
    } else {
      return this.isLogin.pipe(
        switchMap(status => {
          if (status) {
            return this.client(url, body);
          }
        })
      );
    }
  }

  /**
   * TODO:请求对象
   * @param url 地址
   * @param body 数据
   */
  private client(url: string, body: any = {}): Observable<any> {
    return this.http.post(this.config.origin + url, body, {
      withCredentials: true
    });
  }
}
