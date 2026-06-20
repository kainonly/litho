# Copilot Instructions (Litho)

These instructions are the source of truth for this repository. Prefer local code patterns over generic framework examples.

## Project Context

- Angular 21 + NG-ZORRO 21 enterprise admin system.
- Package manager: Bun 1.3.5. Use `bun`, not npm or yarn.
- Styles use LESS. Application domain is `sys.kainonly.com`.
- API gateway is configured by environments; do not hardcode API URLs.

## Working Priorities

1. Keep changes small, typed, and consistent with the touched feature area.
2. Preserve existing architecture, route guards, RBAC behavior, and shared utilities.
3. Prefer existing project abstractions before introducing new ones.

## Angular Rules

- Components are standalone by default in Angular 21; do not set `standalone: true` and do not add NgModule declarations.
- Always set `changeDetection: ChangeDetectionStrategy.OnPush` on components.
- Use `inject()` for dependency injection, `input()`/`output()` for component inputs and outputs, and the `host` metadata object instead of `@HostBinding`/`@HostListener`.
- Prefer signals for local state and `computed()` for derived state. Do not use signal `mutate`; use `set` or `update`.
- Use RxJS for HTTP and existing stream APIs. Clean subscriptions with `takeUntilDestroyed(this.destroyRef)`.
- Use Reactive Forms for application forms. Do not mix template-driven forms into the same form.
- Use native control flow (`@if`, `@for`, `@switch`). Do not add new `*ngIf`, `*ngFor`, or `*ngSwitch` usages.
- Every entity/record loop must use `@for (...; track data.id)`. Do not write arrow functions or assume globals such as `new Date()` in templates.
- Implement feature routes lazily with `loadComponent` or `loadChildren`. All routes except `/login` require the existing auth guard pattern.
- Use `NgOptimizedImage` for static images, except inline base64 images.

## TypeScript And Imports

- Keep strict TypeScript. Avoid `any`; use `unknown` when a type is uncertain.
- Import order: Angular core, Angular/common, third-party libraries, shared project imports, local files.
- Use `@shared` and `src/shared/public-api.ts` exports where consistent with nearby code. Use relative imports for closely related local files.
- Component classes use PascalCase; selectors use kebab-case. Component files match the feature name, for example `users.ts`, `users.html`, `users.less`.
- API files are plural (`users-api.ts`), model interfaces are singular (`User`), and modal validation messages live in nearby `tips.ts` files.

## NG-ZORRO Rules

- Use NG-ZORRO components when suitable, usually imported through `SharedModule` unless the local component already imports modules directly.
- NG-ZORRO components use OnPush; update arrays and objects immutably.
- Bind non-string values with properties, for example `[nzValue]="data.id"`, not `nzValue="data.id"`.
- Configure global defaults with `provideNzConfig` or `NzConfigService.set()`; config names do not include the `nz` prefix.
- Use `provideNzI18n(zh_CN)` for Chinese locale and load icons on demand with `provideNzIcons` or `provideNzIconsPatch`.
- Add `CdkScrollable` to custom scroll containers that contain floating overlays such as Select, Tooltip, Popover, DatePicker, TreeSelect, Cascader, or AutoComplete.
- Prefer Radio for fewer than about five choices and AutoComplete for can-type-can-select inputs.
- Use `nz-input-wrapper` for input affixes, addons, clear buttons, and counters. Do not add deprecated `nz-input-group` usages.
- Use `nzLoading` or loading signals for async UI states.
- In a primary action area, use only one `nzType="primary"`. Use `nzDanger` plus confirmation for destructive actions.
- Table selection cells should include accessible labels with `nzLabel` when practical.

## Shared Project Patterns

- Shared components: `app-active`, `app-title`, `app-keyword`, `app-toolbox`, `app-box`.
- API classes live in `src/shared/apis/`; models live in `src/shared/models/`.
- List pages should use `Global.setModel()` for data, pagination, sorting, searching, loading, and selection state.
- List page initialization should call `m.ready().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.getData())` and fetch data through the model API.
- Build list query params with `HttpParams`, reset page to 1 on refresh, and clear model selections after delete operations.
- Modal forms should use `NzModalService.create`, `NZ_MODAL_DATA`, `NzModalRef`, Reactive Forms, and local `tips.ts` validation messages.
- Submit handlers should accept `unknown`, build typed DTOs, call create/update APIs, then close with `modalRef.triggerOk()` on success.
- Server-side tables use `[nzFrontPagination]="false"`, `[nzTotal]`, page bindings, and server-mode sort/filter parameters when needed.

## Styling

- Component styles must use LESS. Global styles live in `src/styles.less`.
- Follow Ant Design and the existing project visual language.
- Prefer NG-ZORRO Grid, Flex, and Space for layout over one-off layout primitives.
- Keep component styles within the Angular budget: 4 kB warning, 8 kB error.
- Support desktop and mobile layouts where the feature surface requires it.

## Security

- Never commit secrets or credentials.
- Validate user input and sanitize rendered content when markup may be present.
- Do not bypass authentication, authorization, route guards, or permission-resource relationships.

## Commands

- `bun start`: start the development server with HMR.
- `bun run build`: production build.
- `bun run lint`: run ESLint.
- Use Vitest/TestBed patterns when adding or changing tested behavior.
