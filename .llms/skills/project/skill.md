# Litho 项目 - LLM 上下文

## 项目概述

Litho 是一个使用 Angular 21 和 Ng-Zorro-Antd 构建的企业级后台管理系统。

**版本**: 21.0.0
**包管理器**: Bun 1.3.5
**API 网关**: https://apigw.kainonly.com/admin
**域名**: sys.kainonly.com

## 架构原则

### 组件架构
- **所有组件必须是独立组件 (standalone)**（不使用 NgModule 声明）
- 尽可能使用基于信号的响应式而非 RxJS
- 优先使用 OnPush 变更检测策略
- 遵循智能/展示组件模式 (smart/dumb component pattern)
- 组件样式必须使用 LESS

### 状态管理
- 使用 Angular signals 管理组件本地状态
- 使用带 signals 的服务管理跨组件共享状态
- 使用 @ngx-pwa/local-storage 进行客户端持久化存储
- 避免深层嵌套的状态结构

### 路由与导航
- 使用函数式路由守卫 (appGuard 模式)
- 为功能模块实现延迟加载
- 使用 loadComponent/loadChildren 进行代码分割
- 除 /login 外所有路由都需要身份验证

### API 集成
- 所有 API 类位于 `src/shared/apis/`
- 遵循已建立的模式: menus、orgs、permissions、resources、roles、routes、users
- API 基础 URL 在环境文件中配置
- 使用 HttpClient 并配合 `src/shared/models/` 中的类型安全接口

## 代码组织

### 目录结构
```
src/
├── app/
│   ├── __layout/          # 布局组件
│   ├── dashboard/         # 仪表板模块
│   ├── customers/         # 客户管理
│   ├── products/          # 产品管理
│   ├── orders/            # 订单管理
│   ├── settings/          # 设置模块
│   │   ├── general/       # 通用设置
│   │   ├── access/        # 访问控制（权限、资源、路由）
│   │   └── audit/         # 审计日志
│   ├── login/             # 身份验证
│   ├── app.routes.ts      # 主路由配置
│   └── app.guard.ts       # 路由守卫
└── shared/
    ├── apis/              # API 服务类
    ├── models/            # TypeScript 接口
    ├── components/        # 共享组件（Box、Toolbox）
    ├── directives/        # 自定义指令（submit、text）
    ├── pipes/             # 自定义管道（共 9 个）
    └── utils/             # 工具函数（model、filter、helper、loading）
```

### 命名约定
- **组件**: 类名使用 PascalCase，选择器使用 kebab-case
- **文件**: 组件文件名与类名匹配（如 `Dashboard` 类对应 `dashboard.ts`）
- **HTML 模板**: 与组件文件同名（如 `dashboard.html`）
- **样式**: 使用 LESS，文件名同名（如 `dashboard.less`）
- **APIs**: 复数名称（如 `users.ts`、`menus.ts`）
- **Models**: 单数接口（如 `User`、`Menu`、`Role`）

### 导入模式
- 使用 `src/shared/public-api.ts` 中的桶式导出
- 本地文件优先使用相对导入
- 导入分组顺序: Angular 核心、第三方库、共享模块、本地文件

## 数据模型

### 核心实体
项目在 `src/shared/models/` 中有 7 个核心领域模型:
- **User**: 用户账户和配置文件
- **Role**: 用于 RBAC 的用户角色
- **Permission**: 细粒度权限
- **Resource**: 系统资源
- **Route**: 导航路由
- **Menu**: 菜单项
- **Organization (Org)**: 组织单位

### 模型模式
- 所有模型都是 TypeScript 接口
- 位于 `src/shared/models/`
- 每个模型在 `src/shared/apis/` 中都有对应的 API 服务

## 共享资源

### 自定义管道（共 9 个）
所有管道位于 `src/shared/pipes/`:
- `BlankPipe`: 处理空白值
- `DatePipe`: 日期格式化
- `EmptyDatePipe`: 空日期处理
- `EmptyPipe`: 空值处理
- `JoinPipe`: 数组连接
- `MapPipe`: 对象/数组映射
- `ObjectPipe`: 对象操作
- `SlicePipe`: 数组切片
- `SortPipe`: 数组排序
- `SplitPipe`: 字符串分割

### 自定义指令
位于 `src/shared/directives/`:
- `SubmitDirective`: 表单提交处理
- `TextDirective`: 文本样式和格式化

### 共享组件
- `Box`: 容器组件
- `Toolbox`: 工具栏组件

### 工具函数
位于 `src/shared/utils/`:
- `model.ts`: 模型工具
- `filter.ts`: 过滤工具
- `helper.ts`: 通用辅助函数
- `loading.ts`: 加载状态管理

## 样式指南

### LESS 配置
- 组件样式使用 LESS 预处理器
- 全局样式在 `src/styles.less`
- 组件样式预算: 最大 4kB 警告，8kB 错误
- 遵循 Ant Design 主题变量

### 响应式设计
- 使用 Ng-Zorro 栅格系统（24 栏）
- 移动优先方法
- 支持桌面和移动视图

## 测试策略

### 单元测试
- 测试框架: Vitest
- 测试文件与组件放在一起
- 使用 TestBed 进行组件测试
- 模拟服务和 HTTP 调用

### 代码检查与质量
- 使用 ESLint 及 Angular 特定规则
- 使用 Prettier 进行代码格式化
- 启用未使用导入插件
- 提交前运行 `bun run lint`

## 安全与认证

### RBAC 系统
- 完整的基于角色的访问控制
- 权限关联到资源
- 基于路由的访问控制
- 守卫实现在 `app.guard.ts`

### 最佳实践
- 永远不要提交敏感数据
- 使用环境文件进行配置
- 验证用户输入
- 渲染前清理数据

## 开发工作流

### 可用脚本
- `bun start`: 开发服务器（带 HMR）
- `bun run build`: 生产构建
- `bun run lint`: 运行 ESLint

### 环境配置
- **生产环境**: `src/environments/environment.ts`
- **开发环境**: `src/environments/environment.dev.ts`
- 文件替换在 `angular.json` 中配置

### 构建配置
- 初始包大小: 最大 10MB 警告，15MB 错误
- 开发环境启用 source maps
- 生产环境启用 Service Worker
- 输出哈希用于缓存破坏

## PWA 特性

- Service Worker 已配置（`ngsw-config.json`）
- 启用离线支持
- 应用清单支持可安装性
- 仅在生产构建中配置

## 常见模式与反模式

### ✅ 应该做的
- 使用独立组件 (standalone components)
- 使用 signals 管理响应式状态
- 实现 OnPush 变更检测
- 在 @for 循环中使用 trackBy
- 延迟加载功能模块
- 遵循现有的 API 和模型模式
- 一致使用 Ng-Zorro 组件
- 使用响应式表单验证表单

### ❌ 不应该做的
- 不要为新组件使用 NgModule
- 当 signals 足够时不要使用 RxJS
- 不要创建深层嵌套的状态
- 不要绕过路由守卫
- 不要硬编码 API URL
- 不要混用模板驱动和响应式表单
- 当 Ng-Zorro 提供组件时不要创建自定义 UI 组件
- 不要忽略 TypeScript 严格模式错误

## 参考资料

- Angular 文档: https://angular.dev
- Ng-Zorro 文档: https://ng.ant.design
- Ant Design 规范: https://ant.design
- RxJS 文档: https://rxjs.dev

## 注意事项

- 此项目使用 Bun 作为包管理器，而非 npm 或 yarn
- 所有新代码应遵循 Angular 21 最佳实践
- 优先使用组合而非继承
- 保持组件专注和单一职责
- 编写具有清晰命名的自文档化代码
