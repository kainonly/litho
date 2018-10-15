# 接口定义

> 辅助框架建议将请求层完全分离，使用时再将其注入调用。

#### Api目录

这里将api目录创建在 `src/app/api` 中

#### 例子

定义服务 `main.service.ts`

```shell
ng g service api/main
```

编辑

```typescript
import {Injectable} from '@angular/core';
import {HttpService} from 'ngx-bit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class MainService {
  constructor(private http: HttpService) {
  }

  /**
   * TODO:定义一个登录请求
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<any> {
    return this.http.req('main/login', {
      username: username,
      password: password
    }, false);
  }

  /**
   * TODO:定义一个检测请求
   */
  check(): Observable<boolean> {
    return this.http.req('main/check');
  }
}

```



