# Copilot Instructions (Litho)

Use the rule files in `./.llms` when working in this repo. Project rules override on conflict.

## Context Files (Skills)

- `./.llms/skills/project/skill.md` - Project-specific conventions, architecture, and coding standards
- `./.llms/skills/angular/skill.md` - Angular 21 framework rules and best practices
- `./.llms/skills/ng-zorro/skill.md` - Ng-Zorro-Antd component library guidelines

## Key Points

1. **All components MUST be standalone** - No NgModule usage, do NOT set `standalone: true` (Angular 21 default)
2. **Use signals for reactive state** - Prefer signals over RxJS when possible
3. **LESS for styling** - All component styles use LESS preprocessor
4. **Bun package manager** - Use `bun` commands, not npm
5. **Type safety** - Follow TypeScript strict mode
6. **Ng-Zorro components** - Use Ng-Zorro for all UI components
7. **OnPush change detection** - Always set `changeDetection: ChangeDetectionStrategy.OnPush`
8. **takeUntilDestroyed** - Use `takeUntilDestroyed(this.destroyRef)` for subscription cleanup
9. **Model pattern** - Use `Global.setModel()` for list page data management
10. **Modal forms** - Use `NZ_MODAL_DATA` for form data input, `NzModalRef` for modal control

## 共享组件

- `app-active` - 状态显示（启用/禁用）
- `app-title` - 表格列标题（支持信息提示）
- `app-keyword` - 关键词搜索输入框
- `app-toolbox` - 工具栏（筛选、清空、刷新）
- `app-box` - 容器组件

## 常用模式

### 列表页面
- 使用 `Global.setModel()` 创建数据管理实例
- 在 `ngOnInit` 中调用 `m.ready()` 恢复状态后获取数据
- CRUD 操作：`open()`, `delete()`, `bulkDelete()`

### 模态表单
- 定义 `FormInput` 接口传递数据
- 使用 `tips.ts` 配置验证提示消息
- 区分新增和修改模式

## Priority

Project-specific rules in `project.md` take precedence over framework rules when there's a conflict.
