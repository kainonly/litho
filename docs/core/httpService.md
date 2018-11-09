# HttpService

HttpService 是针对通用请求服务的 HttpClient

### req(url: string, body: any = {}): Observable< any >

- 请求对象合成，默认为 `post` 请求
- `url` RESTful请求路由地址
- `body` 发送数据

例如：生成验证jwt的请求对象

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```

### env.with_credentials

- 开启同源策略
- 可以让前后端分离的跨域请求支持携带 `cookie`

在 `environment` 中启用

```typescript
export const environment = {
  bit: {
    with_credentials: true
  }
};
```

### env.http_customize

- 开启自定义前置处理
- 可以对所有请求做出拦截处理

在 `environment` 中启用

```typescript
export const environment = {
  bit: {
    http_customize: true
  }
};
```

例如，对RBAC返回失败的统一请求进行拦截并返回提示

```typescript
import {Component, OnInit} from '@angular/core';
import {BitService, HttpService} from 'ngx-bit';
import packer from './app.language';
import {Observable, of} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService,
              private message: NzMessageService,
              private http: HttpService) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer, true);
    this.http.customize = (res: any): Observable<any> => {
      if (res.error && res.msg === 'error:rbac') {
        this.message.error(this.bit.l['rbac_error']);
      }
      return of(res);
    };
  }
}
```