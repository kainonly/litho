## ConfigService - Config

The configuration set in the module `NgxBitModule.forRoot(environment.bit)` will eventually be injected into the `ConfigService` service.

#### originUrl: string

The domain name of the RESTful Api request interface, such as `https://api.developer.com`

#### staticUrl: string

The static resource address, which can be the relative path of the `origin` domain name, or the cdn domain name, for example, `https://cdn.developer.com/`

#### iconUrl: string

The icons path placed on the CDN, for example, `https://cdn.developer/icons/`

#### namespace: string

RESTful Api address namespace, for example, `sys`, if not set to `''

#### uploadsUrl: boolean

Whether it is a distribution upload, `false` is `originUrl`+`/`+`uploadsPath`, `true` when `uploadsPath` needs to fill in the full upload address

#### uploadsPath: string

Upload address

#### withCredentials: boolean

Allow the request to carry a cookie, set to `true`

#### httpInterceptor: boolean

Whether to enable request interception

#### interceptor = (res) => of(res)

Request to intercept custom processing, such as intercepting a unified request that RBAC returns failed and returning a prompt

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

Breadcrumbs default to the highest level, default `0`

#### pageLimit: number

List pagination, default value `20`

#### formControlCol: any

Form `Control` raster uniform settings

```typescript
formControlCol: {
  common: {
    nzMd: 10,
    nzSm: 12,
    nzXs: 24
  },
  submit: {
    nzMd: {span: 10, offset: 7},
    nzSm: {span: 12, offset: 7},
    nzXs: {span: 24, offset: 0}
  }
}
```

#### formLabelCol: any

Form `Label` raster uniform settings

```typescript
formLabelCol: {
  common: {
    nzSm: 7,
    nzXs: 24
  },
}
```

#### localeDefault: string

Set to display the internationalized default logo, default `zh_cn`

### localeBind: Map<string, NzI18nInterface>

Associate the internationalized identifier of ng-zorro-antd with the ngx-bit internationalization identifier

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

Multi-language input component default identifier, default `zh_cn`

#### i18nContain: any[]

Multi-language input component identification array, for example: set Chinese and English, `['zh_cn', 'en_us']`

#### i18nSwitch: any[]

Multi-language component collection, `i18n` needs to correspond to the identifier

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