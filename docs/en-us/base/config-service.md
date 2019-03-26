## Config (ConfigService)

##### originUrl: string

The domain name of the RESTful Api request interface, such as `https://api.developer.com`

##### staticUrl: string

The domain name of the RESTful Api request interface, such as `https://api.developer.com`...

##### iconUrl: string

The icons path placed on the CDN, for example, `https://cdn.developer/icons/`

##### namespace: string

RESTful Api address namespace, for example, `sys`, if not set to `''

##### uploadsUrl: boolean

Whether it is a distribution upload, `false` is `originUrl`+`/`+`uploadsPath`, `true` when `uploadsPath` needs to fill in the full upload address

##### uploadsPath: string

Upload address

##### withCredentials: boolean

Allow the request to with cookie, set to `true`

##### httpInterceptor: boolean

Whether to enable request interception

##### interceptor = (res) => of(res)

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

##### breadcrumbTop: any

Breadcrumbs default to the highest level, default `0`

##### pageLimit: number

List pagination, default value `20`

##### formControlCol: any

Set Form Control Common col

- common: any
- submit: any

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

##### formLabelCol: any

Set Form Label Common col

```typescript
formLabelCol: {
  common: {
    nzSm: 7,
    nzXs: 24
  },
}
```

##### i18nDefault: string

Multi-language input component default identifier, default `zh_cn`

##### i18nContain: any[]

Multi-language input component identification array, for example: set Chinese and English, `['zh_cn', 'en_us']`

##### i18nSwitch: any[]

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

