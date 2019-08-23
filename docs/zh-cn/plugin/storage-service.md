## StorageService 本地存储

#### clear()

清除所有本地存储

```typescript
this.storage.clear();
```

#### putResource(resource: Map< string, any >, router: Map< string, any >)

将资源保存在本地存储中

- **resource** `Map< string, any >` 菜单数据
- **router** `Map< string, any >` 路由数据

```typescript
this.storage.setMenu(data.menu, data.router);
```

#### autoBreadcrumb(router: Router, match = ['%7B', '%7D'])

自动计算面包屑

- **router** `Router` 应用 `Router` 对象
- **match** `string[]` 路由标签获取符，默认`['%7B', '%7D']`

```typescript
this.storage.autoBreadcrumb(this.router);
```

#### destoryBreadcrumb()

销毁面包屑自动计算

```typescript
this.storage.destoryBreadcrumb();
```