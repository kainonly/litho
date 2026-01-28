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

### 共享组件（共 5 个）
位于 `src/shared/components/`:
- `Box`: 容器组件
- `Toolbox`: 工具栏组件，包含筛选、清空、刷新功能，支持抽屉式筛选面板
- `Active`: 状态显示组件，使用 nz-badge 显示启用/禁用状态
- `Title`: 表格列标题组件，支持信息提示和关键词标记
- `Keyword`: 关键词搜索输入框组件，与 Model 集成

### 工具类
位于 `src/shared/utils/`:

#### Model 类（核心数据管理）
`Model<T, S>` 是通用数据模型类，用于管理列表数据的状态、分页、排序和选择:
- **数据状态**: `data()`、`loading()`、`total()` 信号
- **分页**: `page()`、`pagesize()` 信号
- **选择**: `selection()`、`checked()`、`indeterminate()` 计算信号
- **排序**: `sort` Map 和 `setSort()` 方法
- **搜索**: `search` 对象和 `searchInit` 初始值
- **持久化**: 自动保存/恢复分页、搜索、排序状态到本地存储
- **方法**: `ready()`、`fetch()`、`setSelection()`、`clearSelections()` 等

#### 其他工具
- `filter.ts`: 筛选工具类，管理抽屉式筛选面板状态
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

## 常见模式

### 列表页面模式
```typescript
@Component({
  imports: [SharedModule],
  selector: 'app-settings-users',
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users implements OnInit {
  global = inject(Global);
  users = inject(UsersApi);
  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  // 使用 Global.setModel() 创建 Model 实例
  m = this.global.setModel(`users`, this.users, { q: '' });

  ngOnInit(): void {
    this.m.ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.getData());
  }

  getData(refresh = false): void {
    if (refresh) this.m.page.set(1);
    let params = new HttpParams();
    const { q } = this.m.search;
    if (q) params = params.set('q', q);
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(data?: User): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增用户' : `修改用户【${data.name}】`,
      nzContent: Form,
      nzData: { data },
      nzOnOk: () => this.getData(true)
    });
  }

  delete(data: User): void {
    this.global.deleteConfirm(`用户【${data.name}】`, () => {
      this.users.delete([data.id])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelection(data.id);
          this.getData(true);
        });
    });
  }

  bulkDelete(): void {
    this.global.bulkDeleteConfirm(() => {
      this.users.delete([...this.m.selection().keys()])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelections();
          this.getData(true);
        });
    });
  }
}
```

### 模态表单模式
```typescript
export interface FormInput {
  data?: User;
}

@Component({
  imports: [SharedModule],
  selector: 'app-settings-general-users-form',
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form implements OnInit {
  input = inject<FormInput>(NZ_MODAL_DATA);
  global = inject(Global);
  users = inject(UsersApi);
  private destroyRef = inject(DestroyRef);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    active: [true, [Validators.required]]
  });
  tips = tips; // 导入验证提示配置

  ngOnInit(): void {
    if (this.input.data) {
      this.getData(this.input.data.id);
    }
  }

  getData(id: string): void {
    this.users.findById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.form.patchValue(data));
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    const dto = { ...data };
    if (!this.input.data) {
      this.users.create(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`新增成功`);
          this.modalRef.triggerOk();
        });
    } else {
      dto.id = this.input.data.id;
      this.users.update(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
```

### 验证提示配置模式
```typescript
// tips.ts
export const tips = {
  name: {
    default: { required: '用户名称不能为空' }
  },
  email: {
    default: {
      required: '邮箱不能为空',
      email: '邮箱格式不正确'
    }
  }
};
```

### 表格模板模式
```html
<nz-table
  #tb
  [nzLoading]="m.loading()"
  [nzData]="m.data()"
  [nzTotal]="m.total()"
  [nzFrontPagination]="false"
  [(nzPageIndex)]="m.page"
  [(nzPageSize)]="m.pagesize"
  (nzPageIndexChange)="getData()"
  (nzPageSizeChange)="getData()">
  <thead>
    <tr>
      <th nzAlign="center" nzWidth="50px"
        [nzChecked]="m.checked()"
        [nzIndeterminate]="m.indeterminate()"
        (nzCheckedChange)="m.setCurrentSelections($event)"></th>
      <th><app-title>名称</app-title></th>
      <th nzAlign="center"><app-title>状态</app-title></th>
      <th nzRight nzAlign="center" nzWidth="50px">
        <button nz-button nzType="text"><nz-icon nzType="setting" /></button>
      </th>
    </tr>
  </thead>
  <tbody>
    @for (data of tb.data; track data.id) {
      <tr>
        <td nzAlign="center"
          [nzChecked]="m.selection().has(data.id)"
          (nzCheckedChange)="$event ? m.setSelection(data) : m.removeSelection(data.id)"></td>
        <td>{{ data.name }}</td>
        <td nzAlign="center"><app-active [appValue]="data.active"></app-active></td>
        <td nzRight nzAlign="center">
          <button nz-button nzType="text" nz-dropdown [nzDropdownMenu]="actions">
            <nz-icon nzType="ellipsis"></nz-icon>
          </button>
          <nz-dropdown-menu #actions>
            <ul nz-menu>
              <li nz-menu-item (click)="open(data)">修改</li>
              <li nz-menu-divider></li>
              <li nz-menu-item nzDanger (click)="delete(data)">删除</li>
            </ul>
          </nz-dropdown-menu>
        </td>
      </tr>
    }
  </tbody>
</nz-table>
```

## 常见模式与反模式

### ✅ 应该做的
- 使用独立组件 (standalone components)
- 使用 signals 管理响应式状态
- 实现 OnPush 变更检测
- 在 @for 循环中使用 track
- 延迟加载功能模块
- 遵循现有的 API 和模型模式
- 一致使用 Ng-Zorro 组件
- 使用响应式表单验证表单
- 使用 `takeUntilDestroyed(this.destroyRef)` 管理订阅
- 使用 `Global.setModel()` 创建列表数据管理实例
- 使用 `NZ_MODAL_DATA` 传递模态框数据
- 使用 `tips` 配置统一管理表单验证提示

### ❌ 不应该做的
- 不要为新组件使用 NgModule
- 当 signals 足够时不要使用 RxJS
- 不要创建深层嵌套的状态
- 不要绕过路由守卫
- 不要硬编码 API URL
- 不要混用模板驱动和响应式表单
- 当 Ng-Zorro 提供组件时不要创建自定义 UI 组件
- 不要忽略 TypeScript 严格模式错误
- 不要在列表组件中设置 `standalone: true`（Angular 21 默认）
- 不要忘记使用 `track` 追踪 @for 循环

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
