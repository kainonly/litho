## 请求服务 - HttpService

#### - req(url: string, body: any = {}, , method = 'post'): Observable< any >

创建请求对象

- **url** 请求路由
- **body** 发送数据
- **method** 请求类型, 默认为 `post` 请求
- **Return**  `Observable< any >`

!> 在之前需要定义配置 `origin` `namespace`

例如：请求导航接口

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```


#### 如何跨域携带 Cookie

在 `environment` 中启用

```typescript
export const environment = {
  bit: {
    with_credentials: true
  }
};
```

#### 如何对请求做出拦截

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
import {Observable, of} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';
import packer from './app.language';

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
