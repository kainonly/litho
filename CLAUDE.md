# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Litho is an Angular 20+ utility library that deeply encapsulates ng-zorro-antd UI components and back-end interfaces, simplifying integration and reducing code redundancy. The project follows a modular architecture with a centralized shared library pattern.

## Build & Development Commands

```bash
# Development server (uses 'kain' configuration by default)
npm run dev:kain

# Production build
npm run build

# Linting
npm run lint
```

### Development Notes
- Development server runs on `0.0.0.0` with HMR enabled
- Allowed host: `sys.kainonly.com`
- The `kain` configuration disables optimization, enables source maps, and uses environment file replacement

## Architecture

### Core Patterns

**Model Pattern**: The project uses a specialized `Model<T, S>` class (in [src/shared/utils/model.ts](src/shared/utils/model.ts)) that encapsulates:
- Data management with Angular signals
- Pagination, sorting, and search state
- Row selection with checkbox logic
- Local storage persistence of table state (page, pagesize, search, sort)
- Integration with the `Api<T>` base class

**API Pattern**: Abstract `Api<T>` base class (in [src/shared/apis/index.ts](src/shared/apis/index.ts)) provides:
- Standard CRUD operations (create, update, delete, findById)
- Paginated `find()` method using HTTP headers (`x-page`, `x-pagesize`, `x-total`)
- Bulk operations and existence checks
- All endpoints are prefixed with a `collection` property

**Global Service**: The `Global` service (in [src/shared/global.ts](src/shared/global.ts)) is the factory for creating `Model` instances:
```typescript
setModel<T extends Basic, S extends SearchOption>(storageKey: string, api: Api<T>, search: S): Model<T, S>
```

### Directory Structure

```
src/
├── app/                    # Application components and routes
│   ├── __layout/          # Layout wrapper component
│   ├── login/             # Login page
│   ├── jobs/              # Jobs feature module
│   ├── app.config.ts      # Application providers configuration
│   ├── app.routes.ts      # Route definitions
│   ├── app.guard.ts       # Route guards
│   └── app.interceptor.ts # HTTP interceptor with auth and error handling
├── shared/                 # Shared library (exported via public-api.ts)
│   ├── apis/              # API service classes extending Api<T>
│   ├── components/        # Reusable UI components
│   ├── directives/        # Custom directives
│   ├── models/            # TypeScript interfaces and types
│   ├── pipes/             # Custom pipes
│   ├── utils/             # Utility classes (Model, list, item, filter, loading, helper)
│   ├── global.ts          # Global service with model factory
│   └── shared.module.ts   # Centralized ng-zorro-antd module exports
└── environments/           # Environment configurations
```

### Path Aliases

Configured in [tsconfig.json](tsconfig.json):
- `@env` → `src/environments/environment.ts`
- `@shared` → `src/shared/public-api.ts`
- `@shared/models`, `@shared/apis`, `@shared/components/*`, etc.

### HTTP Architecture

**Interceptor** ([app.interceptor.ts](src/app/app.interceptor.ts)):
- Prefixes all requests with `environment.baseUrl`
- Enables credentials (`withCredentials: true`)
- Handles 401 (redirect to login), 403, and 5xx errors
- Supports `EXTERNAL` context token to bypass interceptor

**Configuration**:
- Uses `provideHttpClient()` with `withFetch()` and XSRF protection
- Cookie name: `XSRF-TOKEN`, Header: `X-XSRF-TOKEN`

### Component Architecture

**Standalone Components**: The project uses Angular standalone components (no NgModule decorators on feature components).

**Shared Module**: [shared.module.ts](src/shared/shared.module.ts) exports all ng-zorro-antd modules and custom modules (components, directives, pipes) for easy importing.

**Feature Components**: Components like `Jobs` and `Login` are standalone and imported directly in routes.

**Layout System**: Uses a `__layout` component as a wrapper for authenticated routes.

## Styling

- **Style Language**: LESS (configured in [angular.json](angular.json))
- **Global Styles**: [src/styles.less](src/styles.less)
- Component styles use `.less` extension

## Linting & Code Style

ESLint configuration ([eslint.config.mjs](eslint.config.mjs)) enforces:
- Prettier formatting
- Import ordering: external (Angular/RxJS/ng-zorro first) → builtin → internal → parent/sibling
- Alphabetical sorting within import groups
- No unused imports or variables (prefix with `_` to ignore)
- Angular prefix conventions: `app-` for components (kebab-case) and directives (camelCase)

## Environment Configuration

Production environment uses file replacement:
- Base: [src/environments/environment.ts](src/environments/environment.ts)
- Development (`kain`): [src/environments/environment.kain.ts](src/environments/environment.kain.ts)

Environment exports:
```typescript
export const environment = {
  production: boolean,
  baseUrl: string
};
```

## Angular Features

- **Version**: Angular 20.x
- **Router**: Hash location strategy with view transitions
- **Service Worker**: Enabled in production (ngsw-config.json)
- **i18n**: Chinese (zh_CN) configured by default
- **Compiler**: Strict mode enabled with all strict template checks
