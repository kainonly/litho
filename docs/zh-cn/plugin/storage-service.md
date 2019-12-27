## StorageService 本地存储

#### clear()

清除框架使用的本地存储

```typescript
this.storage.clear();
```

#### putResource(resource: Map< string, any >, router: Map< string, any >)

将资源数据保存在本地存储中

- **resource** `Map< string, any >` 资源数据
- **router** `Map< string, any >` 路由数据

```typescript
this.mainService.resource().subscribe(data => {
    this.storageService.putResource(data.resource, data.router);
});
```

#### setup(router: Router, match = ['%7B', '%7D'])

安装框架存储支持：计算面包屑、存储历史分页等

- **router** `Router` 应用 `Router` 对象
- **match** `string[]` 路由标签获取符，默认`['%7B', '%7D']`

```typescript
this.storageService.setup(this.router);
```

#### destory()

销毁框架存储支持

```typescript
this.storageService.destory();
```