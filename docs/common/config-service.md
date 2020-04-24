## ConfigService 环境配置

在模块 `NgxBitModule.forRoot(environment.bit)` 设置的配置最终将注入在 `ConfigService` 服务中

#### originUrl: string

RESTful Api 请求接口的域名，例如 `https://api.developer.com`

#### staticUrl: string

静态资源地址，可以是 `origin` 域名的相对路径，也可以是cdn域名，例如，`https://cdn.developer.com/`

#### iconUrl: string

放置在CDN上的icons路径，例如，`https://cdn.developer/icons/`

#### namespace: string

RESTful Api 地址命名空间，例如，`sys`，如果没有请设置为 `''`

#### uploadsUrl: boolean

是否为分布上传，`false` 为 `originUrl`+`/`+`uploadsPath`，`true` 时 `uploadsPath` 需填写完整上传地址

#### uploadsPath: string

上传地址

#### withCredentials: boolean

允许请求携带Cookie，设置为 `true`

#### httpInterceptor: boolean

是否开启请求拦截

#### interceptor = (res) => of(res)

请求拦截自定义处理，例如对RBAC返回失败的统一请求进行拦截并返回提示

```typescript
import {Component, OnInit} from '@angular/core';
import {BitService, ConfigService} from 'ngx-bit';
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
              private config: ConfigService) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer, true);
    this.config.interceptor = (res: any): Observable<any> => {
      if (res.error && res.msg === 'error:rbac') {
        this.message.error(this.bit.l.rbac_error);
      }
      return of(res);
    };
  }
}
```

#### breadcrumbTop: any

面包屑默认最高级，默认 `0`

#### pageLimit: number

列表分页, 默认值 `20`

#### col: any

栅格标识

```typescript
col: {
  label: {
    nzXXl: 4,
    nzXl: 5,
    nzLg: 6,
    nzMd: 7,
    nzSm: 24
  },
  control: {
    nzXXl: 8,
    nzXl: 9,
    nzLg: 10,
    nzMd: 14,
    nzSm: 24,
  },
  submit: {
    nzXXl: {span: 8, offset: 4},
    nzXl: {span: 9, offset: 5},
    nzLg: {span: 10, offset: 6},
    nzMd: {span: 14, offset: 6},
    nzSm: {span: 24, offset: 0}
  }
}
```

#### localeDefault: string

设定显示国际化的默认标识，默认 `zh_cn`

### localeBind: Map<string, NzI18nInterface>

将 ng-zorro-antd 的国际化标识与 ngx-bit 国际化标识关联

```typescript
import {en_US, zh_CN} from 'ng-zorro-antd';

export const environment = {
  localeBind: new Map([
    ['zh_cn', zh_CN],
    ['en_us', en_US]
  ])
}
```

#### i18nDefault: string

多语言输入组件默认标识，默认 `zh_cn`

#### i18nContain: any[]

多语言输入组件标识数组，例如：设置中文与英文，`['zh_cn', 'en_us']`

#### i18nSwitch: any[]

多语言组件集合，`i18n` 需要于标识对应

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
