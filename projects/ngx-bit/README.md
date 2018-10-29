# NGX-BIT

> 基于 Angular 的 RESTful API 辅助框架 (文档尚未补充正确)

##### 项目结构

- `src/app/api` Api接口层
- `src/app/dashboard` 仪表板组件
- `src/app/guard` 守护层
- `src/app/login` 登录组件
- `src/app/pages` 页面组件
- `src/app/app.component.ts` root组件
- `src/app/app.ext.module.ts` 懒加载公用模块
- `src/app/app.language.ts` 公共语言包
- `src/app/app.module.ts` 主模块
- `src/app/router.module.ts` 路由模块
- `src/app/update.service.ts` service work 更新服务

##### 注入服务

- `ConfigService` 配置服务
- `BitService` 通用操作服务
- `EventsService` 事件通讯服务
- `HttpService` Api请求服务

##### 公共服务

- `AddService` 通用新增Api请求
- `DeleteService` 通用删除Api请求
- `EditService` 通用修改Api请求
- `GetService` 通用获取单条数据Api请求
- `ListsService` 通用获取分页列表数据Api请求
- `OriginListsService` 通用列表数据Api请求
- `StatusService` 通用状态切换Api请求
- `SwalService` 通用提交反馈栏

##### 管道

- `JSONParse` JSON字符串转化对象
- `EmptyObject` 是否为空对象

##### 插件

- `<i18n-switch></i18n-switch>` 多语言表单控件

##### 操作库

- `asyncValidator` 异步验证器函数
- `getId` 获取路由Id函数
- `emptyObject` 空对象函数

##### 前端依赖库

- ng-zorro-antd，https://ng.ant.design/docs/introduce/zh
- @angular/pwa
- @angular/service-worker
- @ngx-pwa/local-storage
- sweetalert2

##### 后端协作库

- ThinkPHP5 - kain/think-bit，https://kainonly.github.io/think-bit

##### 常用依赖库

- ngx-amap，高德地图
- ngx-quill，富文本标记
- ngx-pipes，管道库
- ngx-perfect-scrollbar，滚动条
- ngx-socket-io，socket连接库
- ngx-stomp，stomp连接库
- @swimlane/ngx-charts，数据可视化
- @antv/g2，数据可视化
- @antv/g6，数据可视化
- @antv/f2，数据可视化
- ngx-barcode，前端二维码
- ngx-electron，electron渲染线程库

##### 工具

- Mock模拟，https://electronjs.org/apps/mockman
- Api测试，https://www.getpostman.com
- Chrome调试插件，https://augury.rangle.io/

##### 参考文献

- WebApi，https://developer.mozilla.org/zh-CN/docs/Web
- Angular，https://angular.io/docs
- RxJS，https://rxjs-dev.firebaseapp.com
- Ant Design Library，https://library.ant.design
- Ng-Zorro，https://ng.ant.design/docs/introduce/zh
- 数据可视化，https://antv.alipay.com/zh-cn
- 字体图标，http://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a
