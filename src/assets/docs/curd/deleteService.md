# DeleteService

DeleteService 是删除接口请求服务

### customAction(name: string)

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/delete'`，通过 `name` 修改 `'/delete'`

### factory(model: string, condition: any)

- 生成删除请求
- `model` 模块名称
- `condition` 删除条件
- 返回 `Observable< any >`

将管理员服务注入在应用模块下的供应商内

```typescript
@NgModule({
  providers: [
    AdminService
  ]
})
export class AppModule {
}
```

例如：如果 `id` 为条件，这里可以是 `单个id` 也可以是 `多个id构成的数组`

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private deleteService: DeleteService) {}

    delete(id: any): Observable<any> {
        return this.deleteService.factory(this.model, {
            id: id
        });
    }
}
```

例如：如果不以 `id` 为条件，这里需要用条件数组来做参数

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private deleteService: DeleteService) {}

    deleteNoId(condition: any): Observable<any> {
        return this.deleteService.factory(this.model, condition);
    }
}
```

调用自定删除

```typescript
this.admin.deleteNoId([
    ['name','=','one']
]);
```