# NGX-BIT

易用的 Angular 辅助层框架

[![Travis (.org)](https://img.shields.io/travis/kainonly/ngx-bit.svg?style=flat-square)](https://travis-ci.org/kainonly/ngx-bit)
[![Coveralls github](https://img.shields.io/coveralls/github/kainonly/ngx-bit.svg?style=flat-square)](https://coveralls.io/github/kainonly/ngx-bit)
[![npm](https://img.shields.io/npm/v/ngx-bit.svg?style=flat-square)](https://ngx-bit.kainonly.com)
[![Downloads](https://img.shields.io/npm/dm/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![npm](https://img.shields.io/npm/dt/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/kainonly/ngx-bit.js/master/LICENSE)

## 链接

在线案例 [https://console.kainonly.com](https://console.kainonly.com)

- Username `kain`
- Password `pass@VAN1234`

手册地址 [https://ngx-bit.kainonly.com](https://ngx-bit.kainonly.com)

感谢 [JetBrains](https://www.jetbrains.com/?from=ngx-bit) 提供的免费开源 License 赞助

[![JetBrains](https://cdn.kainonly.com/resource/jetbrains.svg)](https://www.jetbrains.com/?from=ngx-bit)

## 快速开始

初始化案例，创建本地项目 bit-example

```shell
ng new bit-example

# ? Would you like to add Angular routing? Yes
# ? Which stylesheet format would you like to use? SCSS
```

首先为项目安装组件依赖 ng-zorro-antd （Ant Design 的 Angular 实现）

```shell
ng add ng-zorro-antd

# ? Enable icon dynamic loading [ Detail: https://ng.ant.design/components/icon/en ] Yes
# ? Set up custom theme file [ Detail: https://ng.ant.design/docs/customize-theme/en ] No
# ? Choose your locale code: zh_CN
# ? Choose template to create project: blank
```

然后安装辅助框架 ngx-bit

```shell
ng add ngx-bit
```

配置项目环境，修改文件 `src\environments\environment.ts`

```typescript
import { en_US, zh_CN } from 'ng-zorro-antd';
import { factoryBitConfig } from 'ngx-bit/operates';

const bit = factoryBitConfig({
  url: {
    api: 'http://localhost:9501',
    static: 'https://cdn.example.com/',
    icon: 'https://cdn.example.com/'
  },
  api: {
    namespace: '/system',
    upload: '/system/main/uploads',
    withCredentials: true
  },
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
      nzSm: 24
    },
    submit: {
      nzXXl: { span: 8, offset: 4 },
      nzXl: { span: 9, offset: 5 },
      nzLg: { span: 10, offset: 6 },
      nzMd: { span: 14, offset: 6 },
      nzSm: { span: 24, offset: 0 }
    }
  },
  locale: {
    default: 'zh_cn',
    mapping: new Map<number, string>([
      [0, 'zh_cn'],
      [1, 'en_us']
    ]),
    bind: new Map<string, any>([
      ['zh_cn', zh_CN],
      ['en_us', en_US]
    ])
  },
  i18n: {
    default: 'zh_cn',
    contain: ['zh_cn', 'en_us'],
    switch: [
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
  },
  page: 20
});

export const environment = {
  production: false,
  bit
};
```

建立共享模块（可按照需要来定义），创建文件 `src\app\app.ext.module.ts`

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { BitExtModule } from 'ngx-bit/component';
import { BitPipeModule } from 'ngx-bit/pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzCardModule,
    NzToolTipModule,
    NzDrawerModule,
    NzMessageModule,
    NzNotificationModule,
    NzDividerModule,
    NzAutocompleteModule,
    NzCheckboxModule,
    NzPageHeaderModule,
    NzTableModule,
    NzMessageModule,
    NzTreeModule,
    NzTagModule,
    NzTreeSelectModule,
    NzRadioModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzAlertModule,
    NzResultModule,
    NzMessageModule,
    NzUploadModule,
    BitExtModule,
    BitPipeModule,
    BitDirectiveModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppExtModule {
}
```

配置 tsconfig.json ，在文件 `tsconfig.json` 中 `compilerOptions` 加入

```json
{
  "compilerOptions":{
    "paths": {
      "@env": [
        "src/environments/environment.ts"
      ],
      "@common": [
        "src/app/common"
      ],
      "@common/*": [
        "src/app/common/*"
      ],
      "@ext": [
        "src/app/app.ext.module.ts"
      ]
    }
  }
}
```

建立公共语言包，创建文件 `src\app\app.language.ts`

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
  i18n: ['多语言输入框', 'a multilingual input box'],
  noTips: ['无提示', 'No prompt'],
  statusSuccess: ['状态已更新成功', 'Status updated successfully'],
  statusError: ['请求错误，状态更新失败', 'Request error, status update failed'],
  logout: ['登出提示', 'Logout Response'],
  logoutSuccess: ['登出成功', 'Logout Success'],
  timeout: ['超时登出', 'Timeout'],
  timeoutWarning: ['您的登录已超时，请重新登录', 'Your login has timed out, please log in again'],
  rbacError: ['您没有权限或该权限已被关闭', 'You don\'t have permission or the permission has been turned off']
};
```

创建必要的服务与页面组件：主服务、仪表盘、登录、欢迎页、空白页

```shell
ng g service common/main
ng g component dashboards --skip-import
ng g component login --skip-import
ng g component pages/welcome --skip-import
ng g component pages/empty --skip-import
```

编写主服务（需根据后端实际情况更改），修改文件 `src\app\common\main.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { BitHttpService } from 'ngx-bit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MainService {
  private model = 'main';

  constructor(
    private http: BitHttpService
  ) {
  }

  /**
   * Login Api
   */
  login(username: string, password: string): Observable<any> {
    return this.http.req(this.model + '/login', {
      username,
      password
    });
  }

  /**
   * Logout Api
   */
  logout(): Observable<boolean> {
    return this.http.req(this.model + '/logout').pipe(
      map(res => !res.error)
    );
  }

  /**
   * Verify Token Api
   */
  verify(): Observable<boolean> {
    return this.http.req(this.model + '/verify');
  }

  /**
   * Get Resource
   * @see https://github.com/kainonly/ngx-bit/blob/master/projects/ngx-bit/mock/resource.json
   */
  resource(): Observable<any> {
    return this.http.req(this.model + '/resource').pipe(
      map(res => {
        const resource: Map<string, any> = new Map<string, any>();
        const router: Map<string, any> = new Map<string, any>();
        const nav: any = [];

        if (!res.error) {
          for (const x of res.data) {
            resource.set(x.key, x);
            if (x.router === 1) {
              router.set(x.key, x);
            }
          }
          for (const x of res.data) {
            if (!x.nav) {
              continue;
            }

            if (x.parent === 'origin') {
              nav.push(x);
            } else {
              const parent = x.parent;
              if (resource.has(parent)) {
                const rows = resource.get(parent);
                if (!rows.hasOwnProperty('children')) {
                  rows.children = [];
                }
                rows.children.push(x);
              }
            }
          }
          return { resource, nav, router };
        } else {
          return {};
        }
      })
    );
  }
}
```

编写令牌验证服务，修改文件 `src\app\common\token.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from '@common/main.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenService implements CanActivate {
  constructor(
    private mainService: MainService,
    private router: Router
  ) {
  }

  canActivate() {
    return this.mainService.verify().pipe(
      map((res: any) => {
        if (res.error) {
          this.router.navigateByUrl('/login');
        }
        return true;
      })
    );
  }
}
```

编写仪表盘组件，修改文件 `src\app\dashboards\dashboards.component.ts`

```typescript
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitService, BitEventsService, BitSupportService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd';
import { MainService } from '@common/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {
  collapsed = false;
  navLists: any[] = [];
  private statusSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private events: BitEventsService,
    private notification: NzNotificationService,
    public support: BitSupportService,
    public bit: BitService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getMenuLists();
    this.support.setup(this.router);
    this.events.on('refresh-menu').subscribe(() => {
      this.getMenuLists();
    });
    this.statusSubscription = this.support.status.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.events.off('refresh-menu');
    this.support.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  /**
   * Get Menu Lists
   */
  private getMenuLists() {
    this.mainService.resource().subscribe(data => {
      this.support.setResource(data.resource, data.router);
      this.navLists = data.nav;
    });
  }

  /**
   * User logout
   */
  logout() {
    this.mainService.logout().subscribe(() => {
      this.support.clearStorage();
      this.support.unsubscribe();
      this.router.navigateByUrl('/login');
      this.notification.success(this.bit.l.logout, this.bit.l.logoutSuccess);
    });
  }
}
```

修改模板文件 `src\app\dashboards\dashboards.component.html`

```html
<nz-layout class="dashboard-layout">
  <nz-sider nzCollapsible
            [(nzCollapsed)]="collapsed"
            [nzBreakpoint]="'lg'">
    <ul nz-menu
        [nzTheme]="'dark'"
        [nzInlineCollapsed]="collapsed"
        [nzMode]="collapsed?'vertical':'inline'">
      <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: navLists}"></ng-container>
      <ng-template #navTpl let-navs>
        <ng-container *ngFor="let x of navs">
          <ng-container *ngIf="x.router;else notRouter">
            <li nz-menu-item
                [bitOpen]="[x.key]"
                [nzSelected]="support.navActive.indexOf(x.key)!==-1">
              <i nz-icon [nzType]="x.icon"></i>
              <span class="nav-text">{{x.name|Locale:bit.locale}}</span>
            </li>
          </ng-container>
          <ng-template #notRouter>
            <li nz-submenu
                [nzOpen]="support.navActive.indexOf(x.key)!==-1">
              <span title><i nz-icon [nzType]="x.icon"></i><span>{{x.name|Locale:bit.locale}}</span></span>
              <ul>
                <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: x.children}"></ng-container>
              </ul>
            </li>
          </ng-template>
        </ng-container>
      </ng-template>
    </ul>
  </nz-sider>
  <nz-layout>
    <ul class="header" nz-menu
        [nzMode]="'horizontal'"
        [nzSelectable]="false">
      <li nz-menu-item routerLink="/">
        <i nz-icon nzType="dashboard"></i> {{bit.l['dashboard']}}
      </li>

      <li nz-submenu>
        <span title>
          <i nz-icon nzType="translation"></i>
          {{bit.l['language']}}
        </span>
        <ul>
          <li nz-menu-item (click)="bit.setLocale('zh_cn')">
            <a title><b>中文</b></a>
          </li>
          <li nz-menu-item (click)="bit.setLocale('en_us')">
            <a title><b>English</b></a>
          </li>
        </ul>
      </li>

      <li style="float: right" nz-submenu>
        <span title>
          <i nz-icon nzType="user"></i>
          {{bit.l['center']}}
        </span>
        <ul>
          <li nz-menu-item routerLink="/{profile}">
            <a title><i nz-icon nzType="idcard"></i> {{bit.l['profile']}}</a>
          </li>
          <li nz-menu-item (click)="logout()">
            <a title><i nz-icon nzType="logout"></i> {{bit.l['exit']}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <nz-content>
      <nz-page-header
        [nzTitle]="support.title|Locale:bit.locale"
        [nzSubtitle]="!support.subTitle?null:support.subTitle"
        [nzBackIcon]="!support.back?null:''"
        (nzBack)="bit.back()"
      >
        <nz-breadcrumb [nzSeparator]="breadcrumbIcon" nz-page-header-breadcrumb>
          <ng-template #breadcrumbIcon>
            <i nz-icon nzType="right"></i>
          </ng-template>
          <nz-breadcrumb-item>
            <a routerLink="/">{{bit.l['dashboard']}}</a>
          </nz-breadcrumb-item>
          <nz-breadcrumb-item *ngFor="let x of support.breadcrumb;last as islast">
            <ng-container *ngIf="islast;else notLast">{{x.name|Locale:bit.locale}}</ng-container>
            <ng-template #notLast>
              <a *ngIf="x.router;else notRouterlink" [bitCrossLevel]="x.key">
                {{x.name|Locale:bit.locale}}
              </a>
              <ng-template #notRouterlink>{{x.name|Locale:bit.locale}}</ng-template>
            </ng-template>
          </nz-breadcrumb-item>
        </nz-breadcrumb>
        <nz-page-header-extra>
          <ng-container *ngTemplateOutlet="support.actions"></ng-container>
        </nz-page-header-extra>
      </nz-page-header>
      <div class="app-warpper">
        <router-outlet></router-outlet>
      </div>
    </nz-content>
  </nz-layout>
</nz-layout>
```

修改样式文件 `src\app\dashboards\dashboards.component.scss`

```scss
:host ::ng-deep {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;

    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    white-space: nowrap;
    color: #fff;
    padding-left: 22px;
    background: #002140;
    overflow: hidden;

    img {
      width: 32px;
      height: 32px;
    }

    nz-divider {
      opacity: 0.6;
      margin: 0 12px;
    }
  }
}

nz-layout {
  &.dashboard-layout {
    height: 100%;
  }
}

nz-content {
  .app-breadcrumb {
    background-color: #fff;
    padding: 16px 24px;
  }

  .app-warpper {
    padding: 15px 12px;
  }
}
```

编写登录组件，修改文件 `src\app\login\login.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { MainService } from '@common/main.service';
import { BitService, BitSupportService } from 'ngx-bit';
import { StorageMap } from '@ngx-pwa/local-storage';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];

  constructor(
    private mainService: MainService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder,
    public bit: BitService,
    private support: BitSupportService,
    private storageMap: StorageMap
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]
      ],
      password: [null, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(20)]
      ],
      remember: [1, [
        Validators.required
      ]]
    });
    this.storageMap.get('users').subscribe((data: Set<string>) => {
      if (data) {
        this.users = [...data.keys()];
      }
    });
  }

  submit(data: any) {
    this.mainService.login(data.username, data.password).subscribe(res => {
      if (!res.error) {
        this.support.clearStorage();
        if (data.remember) {
          this.storageMap.get('users').pipe(
            switchMap((lists: Set<string>) =>
              this.storageMap.set(
                'users',
                lists ? lists.add(data.username) : new Set([data.username])
              )
            )
          ).subscribe(() => {
          });
        }
        this.storageMap.set('currentUsername', data.username).subscribe(() => {
          // ok
        });
        this.storageMap.set('loginTime', new Date().toISOString()).subscribe(() => {
          // ok
        });
        this.notification.success(
          this.bit.l.loginTips,
          this.bit.l.loginSuccess
        );
        this.router.navigateByUrl('/');
      } else {
        this.notification.error(
          this.bit.l.loginTips,
          this.bit.l.loginFailed
        );
      }
    });
  }
}
```

建立子语言包，创建文件 `src\app\login\language.ts`

```typescript
export default {
  username: ['账户', 'Username'],
  usernameRequire: ['请输入管理账户', 'Please Enter Username'],
  usernameCorrectly: ['请输入正确的管理账户', 'Please Enter Correctly Username'],
  password: ['口令', 'Password'],
  passwordRequire: ['请输入您的口令', 'Please Enter You Password!'],
  passwordCorrectly: ['请输入格式正确的口令', 'Please Enter Correctly Password'],
  login: ['登录', 'Login'],
  loginRemember: ['记住帐户登录', 'Remember account login'],
  loginTips: ['登录操作', 'Login Response'],
  loginFailed: ['您的登录失败，请确实账户口令是否正确', 'Your login failed. Please confirm that the account password is correct'],
  loginSuccess: ['登录成功', 'Login Success'],
};
```

修改模板文件 `src\app\login\login.component.html`

```html
<div class="container-login">
  <div class="login-wrapper">
    <h1>
      <img src="assets/login.svg" alt="ant-design"/>
    </h1>
    <form [formGroup]="form" (bitFormSubmit)="submit($event)">
      <nz-form-item>
        <nz-form-control [nzErrorTip]="username.ref">
          <nz-input-group [nzSuffix]="usernameSuffix" [nzPrefix]="userPrefix">
            <input
              type="text"
              nz-input
              formControlName="username"
              [nzAutocomplete]="auto"
              [placeholder]="bit.l['usernameRequire']"
            >
            <nz-autocomplete #auto>
              <ng-container *ngFor="let x of users">
                <nz-auto-option [nzValue]="x">{{x}}</nz-auto-option>
              </ng-container>
            </nz-autocomplete>
            <ng-template #userPrefix>
              <i nz-icon nzType="user"></i>
            </ng-template>
            <ng-template #usernameSuffix>
              <i
                *ngIf="form.get('username').value"
                nz-icon
                nzType="close-circle"
                (click)="form.get('username').reset()"
              >
              </i>
            </ng-template>
          </nz-input-group>
          <bit-error-tip #username [hasError]="{
            required:bit.l['usernameRequire'],
            minlength:bit.l['usernameCorrectly'],
            maxlength:bit.l['usernameCorrectly']
          }">
          </bit-error-tip>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzErrorTip]="password.ref">
          <nz-input-group [nzSuffix]="passwordSuffix" [nzPrefix]="passwordPrefix">
            <input
              nz-input
              type="password"
              formControlName="password"
              [placeholder]="bit.l['passwordRequire']"
            >
          </nz-input-group>
          <ng-template #passwordPrefix>
            <i nz-icon nzType="lock"></i>
          </ng-template>
          <ng-template #passwordSuffix>
            <i
              *ngIf="form.get('password').value"
              nz-icon
              nzType="close-circle"
              (click)="form.get('password').reset()"
            >
            </i>
          </ng-template>
          <bit-error-tip #password [hasError]="{
            required:bit.l['passwordRequire'],
            minlength:bit.l['passwordCorrectly'],
            maxlength:bit.l['passwordCorrectly']
          }">
          </bit-error-tip>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control>
          <label nz-checkbox formControlName="remember">
            <span>{{bit.l['loginRemember']}}</span>
          </label>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" [nzBlock]="true">
            {{bit.l['login']}}
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  </div>
</div>
```

修改样式文件 `src\app\login\login.component.scss`

```scss
.container-login {
  height: 100%;
  background: #fbfbfb;
  position: relative;
  overflow: hidden;
}

.login-wrapper {
  width: 320px;
  margin: 150px auto;
  padding: 40px 25px 25px 25px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, .08);

  h1 {
    padding-bottom: 25px;
    text-align: center;

    img {
      height: 120px;
      width: 120px;
    }
  }
}
```

为登录组件建立懒加载模块，创建文件 `src\app\login\login.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
```

为欢迎页组件建立懒加载模块，创建文件 `src\app\pages\welcome\welcome.module.ts`

```typescript
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '@ext';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule {
}
```

为空白页组件建立懒加载模块，创建文件 `src\app\pages\empty\empty.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmptyComponent]
})
export class EmptyModule {
}
```

建立路由模块（案例中使用的是自定义路由模块），删除默认的 `src\app\app-routing.module.ts` 并创建 `src\app\app.router.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { DashboardsComponent } from './dashboards/dashboards.component';

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
      }
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
  ]
})
export class AppRouterModule {
}
```

配置项目根模块，修改文件 `src\app\app.module.ts`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NgxBitModule } from 'ngx-bit';
import { environment } from '@env';
import { StorageModule } from '@ngx-pwa/local-storage';

registerLocaleData(zh);

import { AppComponent } from './app.component';
import { MainService } from '@common/main.service';
import { TokenService } from '@common/token.service';
import { AppExtModule } from '@ext';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.router.module').then(m => m.AppRouterModule),
    canActivate: [TokenService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppExtModule,
    NgxBitModule.forRoot(environment.bit),
    RouterModule.forRoot(routes, { useHash: true }),
    StorageModule.forRoot({ IDBNoWrap: false })
  ],
  providers: [
    MainService,
    TokenService,
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

修改根组件 `src\app\app.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { BitConfigService, BitService } from 'ngx-bit';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private bit: BitService,
    private config: BitConfigService
  ) {
  }

  ngOnInit() {
    this.config.setupLocales(import('./app.language'));
    this.config.setupHttpInterceptor(
      map(res => {
        return res;
      })
    );
  }
}
```

开始运行，如编译正常说明前端配置完毕

```shell
npm start
```

到此项目并不能正常加载如下提示，因为还需要对应的后端运行

> core.js:6241 ERROR Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null,"headers":{}},"status":0,"statusText":"Unknown Error","url":"http://localhost:9501/system/main/verify","ok":false,"name":"HttpErrorResponse","message":"Http failure response for http://localhost:9501/system/main/verify

可选择以下后端案例运行后正常加载，或根据需要自行定义框架：

- [hyperf-api-case](https://github.com/kainonly/hyperf-api-case) 辅助 Hyperf 框架的工具集合使用案例
- [think-api-case](https://github.com/kainonly/think-api-case) 辅助 ThinkPHP 框架的工具集合使用案例

## License

[MIT](https://github.com/kainonly/ngx-bit/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkainonly%2Fngx-bit.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkainonly%2Fngx-bit?ref=badge_large)
