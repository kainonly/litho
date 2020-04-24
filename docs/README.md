# NGX-BIT

易用的 Angular 辅助层框架

[![npm](https://img.shields.io/npm/v/ngx-bit.svg?style=flat-square)](https://ngx-bit.kain.net.cn)
[![Downloads](https://img.shields.io/npm/dm/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![npm](https://img.shields.io/npm/dt/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/kainonly/ngx-bit.js/master/LICENSE)

### 初始化

```shell
ng new <project_name>
```

### 安装依赖

ng-zorro-antd 是 Ant Design 的 Angular 实现, ngx-bit 辅助层是基于 ng-zorro-antd 框架实现的

```shell
ng add ng-zorro-antd
```

同时 ngx-bit 还使用了 `IndexDB` 前端存储和 `Sweetalert` 提示框插件，它们分别依赖于  `@ngx-pwa/local-storage` `sweetalert2` 来实现。

```shell
npm install ngx-bit @ngx-pwa/local-storage sweetalert2 --save
```

**注意**：当前的版本基于 Angular9 需确认依赖版本

- **@ngx-pwa/local-storage** version >= 9.x
- **sweetalert2**  version >= 9.x

### 定义环境配置

开发环境修改 `src/environments/environment.ts`，生产环境修改 `src/environments/environment.prod.ts`，与 ngx-bit 环境配置相关的如下： 

```typescript
export const environment = {
  production: false,
  bit: {
    originUrl: 'https://<api domain>',
    staticUrl: 'https://<cdn domain>/',
    iconUrl: 'https://<icon domain>/',
    namespace: '/<api service namespace>',
    uploadsUrl: false,
    uploadsPath: '<uploads action path>',
    withCredentials: true,
    httpInterceptor: true,
    pageLimit: 10,
    breadcrumbTop: 0,
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
    },
    localeDefault: 'zh_cn',
    localeBind: new Map([
      ['zh_cn', zh_CN],
      ['en_us', en_US]
    ]),
    i18nDefault: 'zh_cn',
    i18nContain: ['zh_cn', 'en_us'],
    i18nSwitch: [
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

### 定义应用模块

修改 `src/app/app.module.ts`，引入 `NgxBitModule`

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {NgxBitModule} from 'ngx-bit';
import zh from '@angular/common/locales/zh';
import {environment} from '../environments/environment';

registerLocaleData(zh);

import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.router.module').then(m => m.AppRouterModule),
    canActivate: [TokenService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
];;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // 如果前端与后端域名不同可忽略XSRF
    HttpClientXsrfModule.withOptions({
      cookieName: 'xsrf_token',
      headerName: 'X-XSRF-TOKEN',
    }),
    NgZorroAntdModule,
    PerfectScrollbarModule,
    NgxBitModule.forRoot(environment.bit),
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### 定义路由模块

创建 `src/app/app.router.module.ts`，新版本中 `loadChildren` 不再使用字符串路径模式，具体可查看官方说明 [DeprecatedLoadChildren](https://angular.io/api/router/DeprecatedLoadChildren)

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
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: '{empty}',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      },
      {
        path: '{profile}',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
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

### 定义公共语言包

创建 `src/app/app.language.ts`，公共语言包可使用 `registerLocales(packer, true)` 一次性注册

```typescript
export default {
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
  refreshLists: ['刷新列表', 'Refresh Lists'],
  bulkDelete: ['批量删除', 'Bulk Delete'],
  on: ['开启', 'On'],
  off: ['冻结', 'Off'],
  yes: ['是', 'Yes'],
  no: ['否', 'No'],
  validating: ['正在验证...', 'Validating...'],
  action: ['操作', 'Action'],
  notice: ['通知', 'Notification'],
  upload: ['上传', 'Upload'],
  uploadSuccess: ['上传成功', 'Upload Success'],
  uploadError: ['上传失败', 'Upload Failed'],
  updateSuccess: ['更新成功', 'Update Success'],
  updateError: ['更新失败', 'Update Failed'],
  updateErrorMsg: ['当前网络繁忙请稍后再试', 'The current network is busy please try again later'],
  updateSuccessMsg: ['已为您更新该数据状态', 'Thought you update this data state'],
  sort: ['排序', 'Sort'],
  form: ['表单信息', 'Form Infomation'],
  operateInfo: ['操作提示', 'Info'],
  operateSuccess: ['操作成功', 'Success'],
  addSuccess: ['数据已新增成功', 'Data has been added successfully'],
  addFailed: ['数据新增失败', 'Data addition failed'],
  addSuccessMsg: ['您是否要继续新增?', 'would you want to continue?'],
  editSuccess: ['数据修改成功', 'Data modification succeeded'],
  editFailed: ['数据修改失败', 'Data modification failed'],
  editSuccessMsg: ['您是否要继续修改?', 'would you want to continue?'],
  operateBack: ['返回列表', 'back'],
  addContinue: ['继续新增', 'continue'],
  editContinue: ['继续修改', 'continue'],
  operateError: ['操作失败', 'Failed'],
  operateOk: ['好的', 'ok'],
  operateWarning: ['操作警告', 'Warn'],
  deleteWarning: ['您确定要执行删除?', 'You are sure to delete?'],
  deleteCancel: ['再想想', 'Think Again'],
  deleteYes: ['确认删除', 'Confirm Deletion'],
  deleteSuccess: ['数据已被删除', 'Data has been deleted'],
  deleteError: ['请求错误，数据删除失败', 'Request error, data deletion failed'],
  sortYes: ['确认排序', 'Submit Sort'],
  sortCancel: ['取消排序', 'Cancel Sort'],
  sortSuccess: ['数据排序成功', 'Successful data sorting'],
  sortError: ['请求错误，数据排序失败', 'Request error, data sorting failed'],
  selected: ['选中', 'Selected'],
  items: ['项目', 'items'],
  clearSearch: ['清除搜索', 'Clear Search'],
  noResult: ['当前列表无数据', 'No data in current list'],
  noTips: ['无提示', 'No prompt'],
  statusSuccess: ['状态已更新成功', 'Status updated successfully'],
  statusError: ['请求错误，状态更新失败', 'Request error, status update failed'],
  logout: ['登出提示', 'Logout Response'],
  logoutSuccess: ['登出成功', 'Logout Success'],
  timeout: ['超时登出', 'Timeout'],
  timeoutWarning: ['您的登录已超时，请重新登录', 'Your login has timed out, please log in again'],
  rbacError: ['您没有权限或该权限已被关闭', 'You don\'t have permission or the permission has been turned off'],
};
```

### 定义根组件

修改 `src/app/app.component.ts`，并注册公共语言包

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
  constructor(
    private bit: BitService,
    private message: NzMessageService,
    private config: ConfigService
  ) {
  }

  ngOnInit() {
    // 注册公共语言包
    this.bit.registerLocales(packer, true);
    // 设置请求拦截器
    this.config.interceptor = (res: any): Observable<any> => {
      if (res.error && res.msg === 'error:rbac') {
        this.message.error(this.bit.l.rbac_error);
      }
      return of(res);
    };
  }
}
```

### 运行脚本

修改 `package.json` 的 `scripts`

```json
{
  "start": "ng serve --port 4000",
  "serve:open": "ng serve --host 0.0.0.0 --port 4000 --disableHostCheck",
  "build": "ng build --prod --buildOptimizer",
  "server": "http-server -p 4000 -c-1 dist/exercise",
  "lint": "ng lint"
}
```
