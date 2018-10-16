# 删除请求服务 - DeleteService

##### `customAction(name: string)`

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/delete'`，通过 `name` 修改 `'/delete'`

##### `factory(model: string, condition: any): Observable<any>`

- 生成删除请求
- `model` 模块名称
- `condition` 删除条件

例子1：如果 `id` 为条件，这里可以是 `单个id` 也可以是 `多个id构成的数组`

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

例子2：如果不以 `id` 为条件，这里需要用条件数组来做参数

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