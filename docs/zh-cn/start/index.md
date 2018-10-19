# 快速开始

##### 初始化项目

``` shell
ng new anyone
```

##### 安装依赖

``` shell
ng add ng-zorro-antd
ng add @angular/pwa
npm install @ngx-pwa/local-storage sweetalert2 --save
```

##### 安装辅助框架

``` shell
npm install ngx-bit --save
```

##### 定义公共语言包

创建 `src/app/app.language.ts`

``` typescript
export class Language {
  static factory = {
    main: ['Anyone', 'Anyone'],
    dashboard: ['仪表盘', 'Dashboard'],
    language: ['中文', 'English'],
    center: ['个人中心', 'Center'],
    profile: ['信息修改', 'Profile'],
    exit: ['退出系统', 'Exit'],
    add: ['新增', 'Add'],
    success: ['执行成功', 'Success'],
    failed: ['执行失败', 'Failed'],
    back: ['返回', 'Back'],
    submit: ['提交', 'Submit'],
    reset: ['重置', 'Reset'],
    cancel: ['取消', 'Cancel'],
    status: ['状态', 'Status'],
    action: ['操作', 'Action'],
    edit: ['编辑', 'Edit'],
    delete: ['删除', 'Delete'],
    checks_delete: ['删除选中', 'Delete Selected'],
    on: ['开启', 'On'],
    off: ['冻结', 'Off'],
    yes: ['是', 'Yes'],
    no: ['否', 'No'],
  };
}
```

##### 定义辅助框架配置

> 需要与后端架手架共同配置才可正常运行

修改项目配置文件 `src/environments/environment.ts`

``` typescript
import {Language} from '../app/app.language';

export const environment = {
  production: false,
  bit: {
    origin: 'http://localhost',
    namespace: '',
    static: '',
    uploads: 'main/uploads',
    language: Language.factory,
    page_limit: 20,
    withCredentials: true,
    i18n: ['zh_cn', 'en_us'],
    i18n_switch: [
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
  }
};
```

##### 定义Package.json

> 修改 `scripts`

```json
{
  "start": "ng serve --host 0.0.0.0 --disable-host-check",
  "build": "ng build --prod --build-optimizer"
}
```

##### 定义应用模块

初始化后将 `src/app/app.module.ts` 修改为：

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import zh from '@angular/common/locales/zh';

import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {BitService, EventsService, HttpService, NgxBitModule, ConfigService} from 'ngx-bit';

registerLocaleData(zh);

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxBitModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: environment.bit
    },
    BitService,
    EventsService,
    HttpService,
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

> 在这步可以使用 `npm start` 测试下一 `http://localhost:4200` 是否访问正常

##### 定义基础应用组件

修改 `src/app/app.component.ts`：

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}

```

> 在这步可以删除无用的 `src/app/app.component.css`、`src/app/app.component.html`

修改应用模块 `app.module.ts`：

```typescript

```