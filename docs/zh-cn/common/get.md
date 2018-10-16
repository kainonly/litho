# 获取单条数据请求服务 - GetService

##### `customAction(name: string)`

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/get'`，通过 `name` 修改 `'/get'`

##### `factory(model: string, condition: any): Observable<any>`

- 生成新增请求
- `model` 模块名称
- `condition` 条件数组

例子1：如果 `id` 为条件，这里只能是 `单个id`

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private getService: GetService) {}

    get(id: any) {
        return this.getService.factory(this.model, {
            id: id
        });
    }
  }
}
```

例子2：如果不以 `id` 为条件，这里需要用条件数组来做参数

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private getService: GetService) {}

    getNoId(condition: any): Observable<any> {
        return this.getService.factory(this.model, condition);
    }
}
```

调用自定获取

```typescript
this.admin.getNoId([
    ['name','=','one']
]);
```