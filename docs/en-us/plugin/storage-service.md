## Storage (StorageService)

##### clear()

Clear all local storage

```typescript
this.storage.clear();
```

##### setMenu(menu: any, router: any)

Set local storage menu data

- **menu** Menu data
- **router** Routing data

```typescript
this.storage.setMenu(data.menu, data.router);
```

##### autoBreadcrumb(router: Router, match = ['%7B', '%7D'])

Automatic calculation of breadcrumbs

- **router** Apply the `Router` object
- **match** Routing tag getter, default `{}`

```typescript
this.storage.autoBreadcrumb(this.router);
```

##### destoryBreadcrumb()

Automatic calculation of breadcrumbs

```typescript
this.storage.destoryBreadcrumb();
```