# 获取列表数据请求服务 - OriginListsService

##### `customAction(name: string)`

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/originLists'`，通过 `name` 修改 `'/originLists'`

##### `factory(model: string, condition: any[] = [], like: any = []): Observable<any>`

- 生成新增请求
- `model` 模块名称
- `condition` 条件数组
- `like` 模糊搜索数组

为管理员api服务生成分页列表数据请求服务

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private originListsService: OriginListsService) {}

    lists(search: any): Observable<any> {
        return this.originListsService.factory(this.model, [], search);
    }
}
```

模糊搜索调用

```typescript
this.admin.lists([{field: 'username', value: 'o'}]);
```