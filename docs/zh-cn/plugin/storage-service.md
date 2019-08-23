## 本地存储 (StorageService)

##### clear()

清除所有本地存储

```typescript
this.storage.clear();
```

##### setMenu(menu: any, router: any)

设置本地存储菜单数据

- **menu** 菜单数据
- **router** 路由数据

```typescript
this.storage.setMenu(data.menu, data.router);
```

##### autoBreadcrumb(router: Router, match = ['%7B', '%7D'])

自动计算面包屑

- **router** 应用 `Router` 对象
- **match** 路由标签获取符，默认`{}`

```typescript
this.storage.autoBreadcrumb(this.router);
```

##### destoryBreadcrumb()

销毁面包屑自动计算

```typescript
this.storage.destoryBreadcrumb();
```