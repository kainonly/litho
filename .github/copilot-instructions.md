# Copilot Instructions (Litho)

These instructions are the single source of repo rules. Do not depend on `.llms` rule files.

## Project Overview

- Framework: Angular 21 + NG-ZORRO 21
- Package manager: Bun 1.3.5. Use `bun`, not npm or yarn.
- Styles: LESS preprocessor
- API gateway: `https://apigw.kainonly.com/admin`
- Domain: `sys.kainonly.com`
- Application type: enterprise admin system

## Priority

1. Project rules in this file override general Angular or NG-ZORRO guidance.
2. Existing local implementation patterns override generic examples.
3. Keep changes small, typed, and consistent with the current feature area.

## Core Rules

- All components must be standalone. Do not use NgModule declarations.
- Do not set `standalone: true` in Angular decorators; Angular 21 uses standalone by default.
- Always set `changeDetection: ChangeDetectionStrategy.OnPush` on components.
- Prefer signals for local reactive state and computed state.
- Use RxJS for HTTP and existing stream APIs, and clean subscriptions with `takeUntilDestroyed(this.destroyRef)`.
- Use `inject()` instead of constructor injection.
- Prefer `input()` and `output()` over decorators for component inputs and outputs.
- Do not use `@HostBinding` or `@HostListener`; use the `host` object in decorators.
- Use Reactive Forms instead of template-driven forms for application forms.
- Use LESS for all component styles.
- Use strict TypeScript. Avoid `any`; use `unknown` when a type is uncertain.
- Use `@shared` path alias for shared imports when appropriate.
- Do not hardcode API URLs; use environment configuration and existing API services.

## Angular 21 Rules

- Use native control flow: `@if`, `@for`, `@switch`; do not add new `*ngIf`, `*ngFor`, or `*ngSwitch` usages.
- Every `@for` loop must use `track data.id` when iterating entity rows or records.
- Do not write arrow functions in templates.
- Do not assume globals such as `new Date()` are available in templates.
- Use `computed()` for derived signal state.
- Do not use `mutate` on signals; use `set` or `update`.
- Keep state transformations pure and predictable.
- Implement lazy loading for feature routes with `loadComponent` or `loadChildren`.
- Use function-style route guards and existing `appGuard` patterns.
- All routes except `/login` require authentication.
- Use `NgOptimizedImage` for static images. It does not work for inline base64 images.

## NG-ZORRO 21 Rules

- Use NG-ZORRO components for UI whenever a suitable component exists.
- Import the needed NG-ZORRO modules through existing shared imports, usually `SharedModule`, unless the local component already imports modules directly.
- NG-ZORRO components run with OnPush; update arrays and objects immutably instead of mutating inputs.
- Use property binding for non-string values, for example `[nzValue]="data.id"`, not `nzValue="data.id"`.
- Use `provideNzConfig` or `NzConfigService.set()` for global defaults. Config names do not include the `nz` prefix, for example `message`, `notification`, `table`, `form`.
- Use `provideNzI18n(zh_CN)` for Chinese locale; date components also need Angular locale registration or date-fns locale when required.
- Use `provideNzNoAnimation()` or component/service animation options when animations must be disabled.
- Use `provideNzWave({ disabled: true })` when wave effects must be disabled globally.
- Load icons on demand with `provideNzIcons` or `provideNzIconsPatch`; do not statically import all icons.
- For floating overlay components such as Select, Tooltip, Popover, DatePicker, TimePicker, TreeSelect, Cascader, and AutoComplete inside custom scroll containers, add `CdkScrollable` to the scroll container.
- Prefer Radio when there are fewer than about five choices. Prefer AutoComplete for can-type-can-select input.
- Use `nz-input-wrapper` for affixes, addons, clear buttons, and counters. Do not add new `nz-input-group` usage; it is deprecated.
- Keep `nz-input-wrapper` and its inner `nz-input` rendered together; splitting them through dynamic projection can trigger NG0951.
- Use `nzLoading` or loading signals for async operations.
- Buttons: use only one `nzType="primary"` in a primary action area. Use `nzDanger` plus confirmation for destructive actions.
- Table selection cells must include accessible labels when practical through `nzLabel`.

## Shared Components

- `app-active`: status display for enabled/disabled values.
- `app-title`: table column title with optional information tips and keyword highlighting.
- `app-keyword`: keyword search input integrated with list models.
- `app-toolbox`: toolbar for filters, reset, and refresh; supports drawer-style filters.
- `app-box`: container component.

## Architecture

### Component Architecture

- Keep components small and focused on a single responsibility.
- Follow smart/dumb component separation when it helps keep pages clear.
- Prefer composition over inheritance.
- Use feature folders and local files for feature-specific code.

### State Management

- Use Angular signals for component-local state.
- Use services with signals for cross-component shared state.
- Use `@ngx-pwa/local-storage` for client persistence where existing patterns do.
- Avoid deeply nested state structures.

### API Integration

- API classes live in `src/shared/apis/`.
- Models live in `src/shared/models/`.
- Each domain model should have a corresponding API service when it needs server access.
- Use `HttpClient` with typed request and response interfaces.

## Code Organization

### Directory Structure

```text
src/
├── app/
│   ├── __layout/          # layout components
│   ├── analysis/          # analysis feature
│   ├── business/          # business feature
│   ├── index/             # main authenticated area
│   ├── login/             # authentication
│   ├── system/            # system management
│   ├── app.routes.ts      # root routes
│   └── app.guard.ts       # route guard
└── shared/
		├── apis/              # API services
		├── models/            # TypeScript interfaces
		├── components/        # shared components
		├── directives/        # custom directives
		├── pipes/             # custom pipes
		└── utils/             # helpers, model, filter, loading
```

### Naming

- Components: PascalCase class names, kebab-case selectors.
- Component files: match the feature/component name, for example `users.ts`, `users.html`, `users.less`.
- APIs: plural names, for example `users-api.ts`, `roles-api.ts`.
- Models: singular interface names, for example `User`, `Role`, `Resource`.
- Validation tips: use `tips.ts` beside modal form files.

### Imports

- Import order: Angular core, Angular/common libraries, third-party libraries, shared project imports, local files.
- Use `src/shared/public-api.ts` exports and `@shared` where consistent with nearby code.
- Use relative imports for closely related local files.

## Shared Utilities

### Model Pattern

Use `Global.setModel()` for list page data management. The `Model<T, S>` utility manages:

- `data()`, `loading()`, `total()` signals
- `page()` and `pagesize()` pagination signals
- `selection()`, `checked()`, and `indeterminate()` selection state
- `sort` map and `setSort()`
- `search` object and initial search state
- persisted paging, search, and sorting state
- `ready()`, `fetch()`, `setSelection()`, `clearSelection()`, `clearSelections()` and related helpers

### Pipes

Shared pipes live in `src/shared/pipes/`: blank, date, empty-date, empty, join, map, object, slice, sort, and split.

### Directives

Shared directives live in `src/shared/directives/`: submit handling and text formatting/styling.

## List Page Pattern

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

## Modal Form Pattern

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

	close(): void {
		this.modalRef.triggerCancel();
	}

	submit(data: unknown): void {
		const dto = { ...(data as object) };
		if (!this.input.data) {
			// create, then this.modalRef.triggerOk()
		} else {
			// update with dto.id, then this.modalRef.triggerOk()
		}
	}
}
```

## Validation Tips Pattern

```typescript
export const tips = {
	name: { default: { required: '名称不能为空' } },
	email: { default: { required: '邮箱不能为空', email: '邮箱格式不正确' } }
};
```

## Table Template Pattern

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
						<nz-icon nzType="ellipsis" />
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

## Forms And Tables

- Use `nz-form`, `nz-form-item`, `nz-form-label`, and `nz-form-control` with Reactive Forms.
- Use `nzAutoTips` or local `tips.ts` validation messages.
- When manually changing form status, call `updateValueAndValidity()` so `nz-form-control` reflects the state.
- For server-side tables, use `[nzFrontPagination]="false"`, `[nzTotal]`, paging bindings, and sorting/filtering events as needed.
- For table sorting/filtering sent to the server, set `nzColumnKey` and use server-mode sort/filter functions.
- Use immutable updates for table data.

## Styling

- Component styles must use LESS.
- Global styles live in `src/styles.less`.
- Follow Ant Design theme variables and existing project visual language.
- Use NG-ZORRO Grid, Flex, and Space for layout rather than custom one-off layout primitives.
- Component style budget is 4 kB warning and 8 kB error.
- Support desktop and mobile layouts; use the NG-ZORRO 24-column grid where useful.

## Security

- Never commit secrets or credentials.
- Validate user input.
- Sanitize data before rendering when content can contain markup.
- Preserve RBAC and route-guard behavior.
- Permissions are associated with resources and routes.

## Development Workflow

- `bun start`: start development server with HMR.
- `bun run build`: production build.
- `bun run lint`: run ESLint.
- Use Vitest/TestBed patterns for unit tests when adding or changing tested behavior.
- Production build enables Service Worker from `ngsw-config.json`.

## Do

- Follow existing API, model, and page patterns.
- Use `Global.setModel()` for list pages.
- Use `NZ_MODAL_DATA` and `NzModalRef` for modal forms.
- Use `tips.ts` for validation message configuration.
- Use `takeUntilDestroyed(this.destroyRef)` for subscriptions.
- Keep code self-documenting with clear names.

## Do Not

- Do not add NgModules for new application code.
- Do not use `standalone: true` in decorators.
- Do not use RxJS where a signal is enough.
- Do not create custom UI controls when NG-ZORRO provides a fitting component.
- Do not mix template-driven and reactive forms in the same form.
- Do not ignore TypeScript strict-mode errors.
- Do not bypass route guards.
- Do not mutate arrays/objects passed into NG-ZORRO components.
- Do not add new deprecated `nz-input-group` usage.

## References

- Angular documentation: `https://angular.dev`
- NG-ZORRO documentation: `https://ng.ant.design`
- Ant Design specification: `https://ant.design`
