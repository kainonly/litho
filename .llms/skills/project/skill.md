# Litho Project - LLM Context

## Project Overview

Litho is an enterprise-grade admin management system built with Angular 21 and Ng-Zorro-Antd.

**Version**: 21.0.0
**Package Manager**: Bun 1.3.5
**API Gateway**: https://apigw.kainonly.com/admin
**Domain**: sys.kainonly.com

## Architecture Principles

### Component Architecture
- **All components MUST be standalone** (no NgModule declarations)
- Use signal-based reactivity instead of RxJS where possible
- Prefer OnPush change detection strategy
- Follow smart/dumb component pattern
- Components must use LESS for styling

### State Management
- Use Angular signals for local component state
- Use services with signals for shared state across components
- Use @ngx-pwa/local-storage for persistent client-side storage
- Avoid deeply nested state structures

### Routing & Navigation
- Use functional route guards (appGuard pattern)
- Implement lazy loading for feature modules
- Use loadComponent/loadChildren for code splitting
- All routes require authentication except /login

### API Integration
- All API classes are located in `src/shared/apis/`
- Follow the established pattern: menus, orgs, permissions, resources, roles, routes, users
- API base URL configured in environment files
- Use HttpClient with type-safe interfaces from `src/shared/models/`

## Code Organization

### Directory Structure
```
src/
├── app/
│   ├── __layout/          # Layout components
│   ├── dashboard/         # Dashboard module
│   ├── customers/         # Customer management
│   ├── products/          # Product management
│   ├── orders/            # Order management
│   ├── settings/          # Settings module
│   │   ├── general/       # General settings
│   │   ├── access/        # Access control (permissions, resources, routes)
│   │   └── audit/         # Audit logs
│   ├── login/             # Authentication
│   ├── app.routes.ts      # Main routing configuration
│   └── app.guard.ts       # Route guard
└── shared/
    ├── apis/              # API service classes
    ├── models/            # TypeScript interfaces
    ├── components/        # Shared components (Box, Toolbox)
    ├── directives/        # Custom directives (submit, text)
    ├── pipes/             # Custom pipes (9 pipes total)
    └── utils/             # Utilities (model, filter, helper, loading)
```

### Naming Conventions
- **Components**: PascalCase class names, kebab-case selectors
- **Files**: Component file name matches class name (e.g., `dashboard.ts` for `Dashboard` class)
- **HTML Templates**: Same name as component file (e.g., `dashboard.html`)
- **Styles**: Use LESS with same name (e.g., `dashboard.less`)
- **APIs**: Plural names (e.g., `users.ts`, `menus.ts`)
- **Models**: Singular interfaces (e.g., `User`, `Menu`, `Role`)

### Import Patterns
- Use shared barrel exports from `src/shared/public-api.ts`
- Prefer relative imports for local files
- Group imports: Angular core, third-party, shared, local

## Data Models

### Core Entities
The project has 7 core domain models located in `src/shared/models/`:
- **User**: User accounts and profiles
- **Role**: User roles for RBAC
- **Permission**: Granular permissions
- **Resource**: System resources
- **Route**: Navigation routes
- **Menu**: Menu items
- **Organization (Org)**: Organizational units

### Model Pattern
- All models are TypeScript interfaces
- Located in `src/shared/models/`
- Each has corresponding API service in `src/shared/apis/`

## Shared Resources

### Custom Pipes (9 Total)
All pipes are in `src/shared/pipes/`:
- `BlankPipe`: Handle blank values
- `DatePipe`: Date formatting
- `EmptyDatePipe`: Empty date handling
- `EmptyPipe`: Empty value handling
- `JoinPipe`: Array joining
- `MapPipe`: Object/array mapping
- `ObjectPipe`: Object manipulation
- `SlicePipe`: Array slicing
- `SortPipe`: Array sorting
- `SplitPipe`: String splitting

### Custom Directives
Located in `src/shared/directives/`:
- `SubmitDirective`: Form submission handling
- `TextDirective`: Text styling and formatting

### Shared Components
- `Box`: Container component
- `Toolbox`: Utility toolbar component

### Utilities
Located in `src/shared/utils/`:
- `model.ts`: Model utilities
- `filter.ts`: Filtering utilities
- `helper.ts`: General helpers
- `loading.ts`: Loading state management

## Styling Guidelines

### LESS Configuration
- Component styles use LESS preprocessor
- Global styles in `src/styles.less`
- Component style budget: max 4kB warning, 8kB error
- Follow Ant Design theming variables

### Responsive Design
- Use Ng-Zorro Grid system (24-column)
- Mobile-first approach
- Support for desktop and mobile views

## Testing Strategy

### Unit Testing
- Test framework: Vitest
- Test files co-located with components
- Use TestBed for component testing
- Mock services and HTTP calls

### Linting & Code Quality
- ESLint with Angular-specific rules
- Prettier for code formatting
- Unused imports plugin enabled
- Run `bun run lint` before commits

## Security & Authentication

### RBAC System
- Complete Role-Based Access Control
- Permissions linked to resources
- Route-based access control
- Guard implementation in `app.guard.ts`

### Best Practices
- Never commit sensitive data
- Use environment files for configuration
- Validate user input
- Sanitize data before rendering

## Development Workflow

### Available Scripts
- `bun start`: Development server with HMR
- `bun run build`: Production build
- `bun run lint`: Run ESLint

### Environment Configuration
- **Production**: `src/environments/environment.ts`
- **Development**: `src/environments/environment.dev.ts`
- File replacement configured in `angular.json`

### Build Configuration
- Initial bundle size: max 10MB warning, 15MB error
- Enable source maps in development
- Service Worker enabled in production
- Output hashing for cache busting

## PWA Features

- Service Worker configured (`ngsw-config.json`)
- Offline support enabled
- App manifest for installability
- Configured in production builds only

## Common Patterns & Anti-Patterns

### ✅ DO
- Use standalone components
- Use signals for reactive state
- Implement OnPush change detection
- Use trackBy in @for loops
- Lazy load feature modules
- Follow the existing API and model patterns
- Use Ng-Zorro components consistently
- Validate forms with reactive forms

### ❌ DON'T
- Don't use NgModule for new components
- Don't use RxJS when signals suffice
- Don't create deeply nested state
- Don't bypass route guards
- Don't hardcode API URLs
- Don't mix template-driven and reactive forms
- Don't create custom UI components when Ng-Zorro provides them
- Don't ignore TypeScript strict mode errors

## References

- Angular Documentation: https://angular.dev
- Ng-Zorro Documentation: https://ng.ant.design
- Ant Design Specification: https://ant.design
- RxJS Documentation: https://rxjs.dev

## Notes

- This project uses Bun as the package manager, not npm or yarn
- All new code should follow Angular 21 best practices
- Prefer composition over inheritance
- Keep components focused and single-responsibility
- Write self-documenting code with clear naming
