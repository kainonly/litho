# Angular 21 LLM 上下文
# 来源: https://angular.dev/llms.txt

## 框架概述
Angular 是一个用于构建现代 Web 应用程序的开发框架，让开发更有信心。
当前版本: Angular 21

## 核心概念

### 组件 (Components)
- 组件是 Angular 应用程序的主要构建块
- 使用独立组件 standalone components（Angular 21 默认）
- 组件装饰器: @Component({ selector, template/templateUrl, styles/styleUrls })
- 使用 input() 函数创建基于信号的输入
- 使用 output() 函数创建基于信号的输出

### 模板 (Templates)
- 使用 Angular 模板语法和插值表达式 {{ }}
- 属性绑定: [property]="value"
- 事件绑定: (event)="handler()"
- 双向绑定: [(ngModel)]="value"
- 控制流: @if, @else, @for, @switch (新的块语法)
- 模板引用变量: #ref

### 指令 (Directives)
- 结构型指令改变 DOM 布局 (@if, @for, @switch)
- 属性型指令改变元素外观/行为
- 使用 @Directive 装饰器创建自定义指令

### 信号 (Signals)
- 用于状态管理的响应式原语
- signal() 创建可写信号
- computed() 创建派生信号
- effect() 创建副作用
- 尽可能使用信号代替 RxJS，实现更简单的响应式

### 依赖注入 (Dependency Injection)
- 分层注入系统
- @Injectable({ providedIn: 'root' }) 用于单例服务
- inject() 函数用于注入依赖
- 注入令牌 (Injection tokens) 用于非类依赖

### HTTP 客户端 (HTTP Client)
- 使用 HttpClient 发起 HTTP 请求
- 使用 withInterceptors() 创建函数式拦截器
- 类型安全的请求/响应处理
- withFetch() 使用原生 fetch API

### 表单 (Forms)
- 响应式表单: FormGroup, FormControl, FormArray
- 模板驱动表单: ngModel
- 使用 Validators 进行表单验证
- 自定义验证器和异步验证器

### 路由 (Routing)
- 独立路由配置
- 路由守卫: CanActivate, CanDeactivate
- 使用 Resolvers 预取数据
- 使用 loadComponent/loadChildren 延迟加载

### 服务端渲染 (Server-Side Rendering - SSR)
- 使用 @angular/ssr 进行 Angular SSR
- Hydration 用于客户端接管
- 预渲染 (Prerendering) 用于静态页面

### 测试 (Testing)
- 使用 TestBed 进行单元测试
- 使用 ComponentFixture 进行组件测试
- 使用 HttpTestingController 进行服务测试
- E2E 测试支持

## 最佳实践

### 组件设计
- 保持组件小而专注
- 使用智能/展示组件模式 (smart/dumb component pattern)
- 优先使用 OnPush 变更检测策略
- 使用信号管理响应式状态

### 状态管理
- 使用信号管理组件本地状态
- 使用带信号的服务管理共享状态
- 避免深层嵌套的状态

### 性能优化
- 在 @for 循环中使用 trackBy
- 延迟加载路由和组件
- 使用 OnPush 变更检测策略
- 通过 tree-shaking 最小化打包体积

### 代码组织
- 基于功能的文件夹结构
- 使用 index.ts 进行桶式导出 (barrel exports)
- 共享模块用于通用组件
- 在 tsconfig 中配置路径别名

## Angular CLI 命令
- ng new: 创建新项目
- ng serve: 启动开发服务器
- ng build: 生产构建
- ng generate: 生成组件、服务等
- ng lint: 运行代码检查
- ng test: 运行单元测试
