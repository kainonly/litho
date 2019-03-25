NGX-BIT
=======

基于 Angular 的 CURD 辅助框架

[![NPM version](https://badge.fury.io/js/ngx-bit.png)](http://badge.fury.io/js/ngx-bit)
[![Downloads](https://img.shields.io/npm/dm/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kainonly/ngx-bit.js/master/LICENSE)

### 初始化操作

```
ng new anyone
```

### 安装 UI

ng-zorro-antd 是 Ant Design 的 Angular 实现, 这里也是基于 ng-zorro-antd 进行辅助扩展, 对应 angular v6 版本需要安装 `ng-zorro-antd@1.8.x`

```shell
ng add ng-zorro-antd@1.8.x
```

### 安装组件

ngx-bit 的部分功能依赖于 `@ngx-pwa/local-storage@v6` `sweetalert2`

```shell
npm install ngx-bit @ngx-pwa/local-storage@v6 sweetalert2 --save
```

> 也可以加入 Service Work 服务提高使用体验

```shell
ng add @angular/pwa@v6-lts
```

### 定义配置

修改 `src/environments/environment.ts`, 生产环境则修改 `environment.prod.ts`

```typescript
export const environment = {
  production: false,
  bit: {
    origin: 'https://api.develop.com',
    namespace: '/api',
    static: 'https://cdn.develop.com/',
    uploads: 'api/main/uploads',
    page_limit: 20,
    with_credentials: true,
    http_customize: true,
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

### 定义模块

修改 `src/app/app.module.ts`

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

### 定义路由

创建 `src/app/app.router.module.ts`

```typescript
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {AppExtModule} from './app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {path: '', loadChildren: './pages/welcome/welcome.module#WelcomeModule'},
      {path: '{empty}', loadChildren: './pages/empty/empty.module#EmptyModule'},
      {path: '{profile}', loadChildren: './pages/profile/profile.module#ProfileModule'},
      {path: '{router-index}', loadChildren: './pages/router-index/router-index.module#RouterIndexModule'},
      {path: '{router-add}', loadChildren: './pages/router-add/router-add.module#RouterAddModule'},
      {path: '{router-edit}/:id', loadChildren: './pages/router-edit/router-edit.module#RouterEditModule'},
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardsComponent
  ],
})
export class AppRouterModule {
}
```

再次修改 `src/app/app.module.ts`，将路由模块引入

```typescript
const routes: Routes = [
  {path: '', loadChildren: './app.router.module#AppRouterModule', canActivate: [Auth]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
})
export class AppModule {
}
```

### 定义语言包

创建 `src/app/app.language.ts`

```typescript
export default {
  main: ['测试', 'Test'],
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
  edit: ['编辑', 'Edit'],
  delete: ['删除', 'Delete'],
  checks_delete: ['删除选中', 'Delete Selected'],
  on: ['开启', 'On'],
  off: ['冻结', 'Off'],
  yes: ['是', 'Yes'],
  no: ['否', 'No'],
  validating: ['正在验证...', 'Validating...'],
  action: ['操作', 'Action'],
  card_action: ['请选择操作', 'Please Select Action'],
  notice: ['通知', 'Notification'],
  upload: ['上传', 'Upload'],
  upload_success: ['上传成功', 'Upload Success'],
  upload_error: ['上传失败', 'Upload Failed'],
  update_success: ['更新成功', 'Update Success'],
  update_error: ['更新失败', 'Update Failed'],
  update_error_msg: ['当前网络繁忙请稍后再试', 'The current network is busy please try again later'],
  update_success_msg: ['已为您更新该数据状态', 'Thought you update this data state'],
  sort: ['排序', 'Sort'],
  offline: ['下线', 'Offline'],
  online: ['上线', 'Online'],
  form: ['表单信息', 'Form Infomation'],
  operate_info: ['操作提示', 'Info'],
  operate_success: ['操作成功', 'Success'],
  add_success: ['数据已新增成功', 'Data has been added successfully'],
  add_failed: ['数据新增失败', 'Data addition failed'],
  add_success_msg: ['您是否要继续新增?', 'would you want to continue?'],
  edit_success: ['数据修改成功', 'Data modification succeeded'],
  edit_failed: ['数据修改失败', 'Data modification failed'],
  edit_success_msg: ['您是否要继续修改?', 'would you want to continue?'],
  operate_back: ['返回列表', 'back'],
  add_continue: ['继续新增', 'continue'],
  edit_continue: ['继续修改', 'continue'],
  operate_error: ['操作失败', 'Failed'],
  operate_ok: ['好的', 'ok'],
  operate_warning: ['操作警告', 'Warn'],
  delete_warning: ['您确定要执行删除?', 'You are sure to delete?'],
  delete_cancel: ['再想想', 'Think Again'],
  delete_yes: ['确认删除', 'Confirm Deletion'],
  delete_success: ['数据已被删除', 'Data has been deleted'],
  delete_error: ['请求错误，数据删除失败', 'Request error, data deletion failed'],
  sort_yes: ['确认排序', 'Submit Sort'],
  sort_cancel: ['取消排序', 'Cancel Sort'],
  sort_success: ['数据排序成功', 'Successful data sorting'],
  sort_error: ['请求错误，数据排序失败', 'Request error, data sorting failed'],
  selected: ['选中', 'Selected'],
  items: ['项目', 'items'],
  no_result: ['当前列表无数据', 'No data in current list'],
  status_success: ['状态已更新成功', 'Status updated successfully'],
  status_error: ['请求错误，状态更新失败', 'Request error, status update failed'],
  logout: ['登出提示', 'Logout Response'],
  logout_success: ['登出成功', 'Logout Success'],
  timeout: ['超时登出', 'Timeout'],
  timeout_warning: ['您的登录已超时，请重新登录', 'Your login has timed out, please log in again'],
  rbac_error: ['您没有权限或该权限已被关闭', 'You don\'t have permission or the permission has been turned off'],
};
```

### 定义根组件

修改 `src/app/app.component.ts`，并注册公共语言包

```typescript
import {Component, OnInit} from '@angular/core';
import {BitService} from 'ngx-bit';
import packer from './app.language';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer, true);
  }
}
```

### 基础结构

- `src/app/api` 接口目录
- `src/app/dashboard` 仪表板组件
- `src/app/guard` 守护模型
- `src/app/login` 登录组件
- `src/app/pages` 页面组件
- `src/app/app.component.ts` 根组件
- `src/app/app.ext.module.ts` 子模块共用模块
- `src/app/app.language.ts` 共用语言包
- `src/app/app.module.ts` 应用模块
- `src/app/router.module.ts` 路由模块
- `src/app/update.service.ts` service work 服务

### 运行脚本

修改 `package.json` 的 `scripts`

```json
{
  "start": "ng serve --host 0.0.0.0 --disable-host-check",
  "build": "ng build --prod --buildOptimizer"
}
```
