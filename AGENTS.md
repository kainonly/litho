# Litho 项目 - Codex 规则

You are an expert in TypeScript, Angular 21, and Ng-Zorro-Antd enterprise application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## 项目概述

- **框架**: Angular 21 + Ng-Zorro-Antd 21
- **包管理器**: Bun 1.3.5（不使用 npm）
- **样式**: LESS 预处理器
- **API 网关**: https://apigw.kainonly.com/admin

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- 使用 `@shared` 路径别名导入共享模块

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.
- 使用 `takeUntilDestroyed(this.destroyRef)` 管理订阅生命周期

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).
- 在 `@for` 循环中必须使用 `track data.id`

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## 共享组件

使用项目提供的共享组件：
- `app-active`: 显示启用/禁用状态
- `app-title`: 表格列标题（支持信息提示）
- `app-keyword`: 关键词搜索输入框
- `app-toolbox`: 工具栏（筛选、清空、刷新）
- `app-box`: 容器组件

## 列表页面模式

```typescript
@Component({
  imports: [SharedModule],
  selector: 'app-xxx',
  templateUrl: './xxx.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Xxx implements OnInit {
  global = inject(Global);
  xxxApi = inject(XxxApi);
  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel(`xxx`, this.xxxApi, { q: '' });

  ngOnInit(): void {
    this.m.ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.getData());
  }

  getData(refresh = false): void {
    if (refresh) this.m.page.set(1);
    let params = new HttpParams();
    if (this.m.search.q) params = params.set('q', this.m.search.q);
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(data?: Xxx): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增' : `修改【${data.name}】`,
      nzContent: Form,
      nzData: { data },
      nzOnOk: () => this.getData(true)
    });
  }

  delete(data: Xxx): void {
    this.global.deleteConfirm(`【${data.name}】`, () => {
      this.xxxApi.delete([data.id])
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
      this.xxxApi.delete([...this.m.selection().keys()])
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

## 模态表单模式

```typescript
export interface FormInput {
  data?: Xxx;
}

@Component({
  imports: [SharedModule],
  selector: 'app-xxx-form',
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form implements OnInit {
  input = inject<FormInput>(NZ_MODAL_DATA);
  private destroyRef = inject(DestroyRef);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });
  tips = tips;

  ngOnInit(): void {
    if (this.input.data) this.getData(this.input.data.id);
  }

  submit(data: Any): void {
    const dto = { ...data };
    if (!this.input.data) {
      // 新增逻辑
    } else {
      dto.id = this.input.data.id;
      // 更新逻辑
    }
  }
}
```

## 验证提示配置

```typescript
// tips.ts
export const tips = {
  name: { default: { required: '名称不能为空' } },
  email: { default: { required: '邮箱不能为空', email: '邮箱格式不正确' } }
};
```
