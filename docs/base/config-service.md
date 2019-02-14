### origin: string

- RESTful Api 请求接口的域名
- 例如，`https://api.develop.com`

### namespace: string

- RESTful Api 地址命名空间
- 例如，`system`，如果没有请设置为 `''`

### static: string

- 静态资源地址
- 可以是 `origin` 域名的相对路径，也可以是cdn域名，例如，`https://cdn.develop.com/`

### uploads: string

- 上传地址
- 可以是 `origin` 域名的相对路径，也可以是分离式上传服务器的域名

### with_credentials: boolean

- 同源策略，XMLHttpRequest是否该使用类似cookies、authorization headers、TLS
- 浏览器建议设置 `true`，将 `token` 存储在服务器 `cookie` 中，并加强 `csrf` 防御

### http_customize: boolean

- 开启全局请求前置处理

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

### i18n: any[]

- 多语言组件类型标识
- 例如：设置中文与英文，`['zh_cn', 'en_us']`

### i18n_switch: any[]

- 多语言组件集合，`i18n` 需要于标识对应

```typescript
[
    {
        i18n: 'zh_cn',
        name: {
            zh_cn: '中文',
            en_us: 'Chinese'
        }
    },
    {
        i18n: 'en_us',
        name: {
            zh_cn: '英文',
            en_us: 'English'
        }
    }
]
```

### page_limit: number

- 分页
- 推荐默认值 `20`
