## Storage (StorageService)

#### clear()

Clear all local storage

```typescript
this.storage.clear();
```

#### putResource(resource: Map< string, any >, router: Map< string, any >)

Save resources in local storage

- **resource** `Map< string, any >` Resource data
- **router** `Map< string, any >` Routing data

```typescript
this.storage.setMenu(data.menu, data.router);
```

#### autoBreadcrumb(router: Router, match = ['%7B', '%7D'])

Automatic calculation of breadcrumbs

- **router** `Router` Apply the `Router` object
- **match** `string[]` Routing label getter, default `['%7B', '%7D']`

```typescript
this.storage.autoBreadcrumb(this.router);
```

#### destoryBreadcrumb()

Turn off automatic calculation of breadcrumbs

```typescript
this.storage.destoryBreadcrumb();
```