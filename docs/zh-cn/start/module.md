# 模块定义

> 这里模块定义分为主模块与懒加载扩展模块

#### 主模块

初始化完成后，`app.module.ts` 大概是这样：

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import zh from '@angular/common/locales/zh';

import {BitService, EventsService, HttpService, NgxBitModule, ConfigService} from 'ngx-bit';

registerLocaleData(zh);

import {AppComponent} from './app.component';

// 登录状态守护
import {Auth} from './guard/auth.service';

// Service Work 更新
import {AppUpdateService} from './app.update.service';

// 此处省略，导入Api服务
import {...} from './api';

// 顶层路由
const routes: Routes = [
  {path: '', loadChildren: './app.router.module#AppRouterModule', canActivate: [Auth]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
];

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
    RouterModule.forRoot(routes, {useHash: true}),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: environment.bit
    },
    AppUpdateService,
    Auth,
    BitService,
    EventsService,
    HttpService,
    ...
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

#### 懒加载扩展模块

同级下创建 `app.ext.module.ts`，该模块主要提供给懒加载路由的组件子模块

```typescript
import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBitPipeModule} from 'ngx-bit';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NgxBitPipeModule,
  ],
})
export class AppExtModule {
}
```
