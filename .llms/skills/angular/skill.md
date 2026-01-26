# Angular 21 LLM Context
# Source: https://angular.dev/llms.txt

## Framework Overview
Angular is a web development framework for building modern web applications with confidence.
Current Version: Angular 21

## Core Concepts

### Components
- Components are the main building blocks of Angular applications
- Use standalone components (default in Angular 21)
- Component decorator: @Component({ selector, template/templateUrl, styles/styleUrls })
- Signal-based inputs with input() function
- Signal-based outputs with output() function

### Templates
- Use Angular template syntax with interpolation {{ }}
- Property binding with [property]="value"
- Event binding with (event)="handler()"
- Two-way binding with [(ngModel)]="value"
- Control flow: @if, @else, @for, @switch (new block syntax)
- Template reference variables with #ref

### Directives
- Structural directives change DOM layout (@if, @for, @switch)
- Attribute directives change element appearance/behavior
- Custom directives with @Directive decorator

### Signals
- Reactive primitive for state management
- signal() creates a writable signal
- computed() creates a derived signal
- effect() creates side effects
- Use signals instead of RxJS where possible for simpler reactivity

### Dependency Injection
- Hierarchical injection system
- @Injectable({ providedIn: 'root' }) for singleton services
- inject() function for injecting dependencies
- Injection tokens for non-class dependencies

### HTTP Client
- HttpClient for making HTTP requests
- Functional interceptors with withInterceptors()
- Type-safe request/response handling
- withFetch() for native fetch API

### Forms
- Reactive forms with FormGroup, FormControl, FormArray
- Template-driven forms with ngModel
- Form validation with Validators
- Custom validators and async validators

### Routing
- Standalone router configuration
- Route guards with CanActivate, CanDeactivate
- Resolvers for pre-fetching data
- Lazy loading with loadComponent/loadChildren

### Server-Side Rendering (SSR)
- Angular SSR with @angular/ssr
- Hydration for client-side takeover
- Prerendering for static pages

### Testing
- Unit testing with TestBed
- Component testing with ComponentFixture
- Service testing with HttpTestingController
- E2E testing support

## Best Practices

### Component Design
- Keep components small and focused
- Use smart/dumb component pattern
- Prefer OnPush change detection
- Use signals for reactive state

### State Management
- Use signals for local component state
- Use services with signals for shared state
- Avoid deeply nested state

### Performance
- Use trackBy in @for loops
- Lazy load routes and components
- Use OnPush change detection strategy
- Minimize bundle size with tree-shaking

### Code Organization
- Feature-based folder structure
- Barrel exports with index.ts
- Shared module for common components
- Path aliases in tsconfig

## Angular CLI Commands
- ng new: Create new project
- ng serve: Development server
- ng build: Production build
- ng generate: Generate components, services, etc.
- ng lint: Run linting
- ng test: Run unit tests
