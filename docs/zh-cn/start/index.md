# 快速开始

#### 初始化项目

``` shell
ng new anyone
```

#### 安装依赖

``` shell
ng add ng-zorro-antd
ng add @angular/pwa
npm install @ngx-pwa/local-storage sweetalert2 --save
```

#### 安装辅助框架

``` shell
npm install ngx-bit --save
```

#### 编辑配置

> 需要与后端架手架共同配置才可正常运行

修改项目配置文件 `environment.ts`

``` typescript
// 公共语言包
import {Language} from '../app/app.language';

export const environment = {
  production: false,
  bit: {
    origin: 'https://api.anyone',
    namespace: '',
    static: 'https://cdn.anyone/',
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

#### 定义公共语言包

创建 `app.language.ts`

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

#### 导入配置

编辑 `app.module.ts`

``` typescript
import {BitService, EventsService, HttpService, NgxBitModule, ConfigService} from 'ngx-bit';

@NgModule({
    imports: [
        ...
        NgxBitModule,
        ...
    ],
    providers: [
        ...
        {
            provide: ConfigService,
            useValue: environment.bit
        },
        BitService,
        EventsService,
        HttpService,
        ...
    ]
})
export class AppModule {
}
```
