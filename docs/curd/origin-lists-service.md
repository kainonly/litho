## 获取列表数据请求 - OriginListsService

#### customAction(name: string)

设置自定义函数名

- **name** 函数名，请求地址默认为 `model+'/originLists'`，通过 `name` 修改 `'/originLists'`

#### factory(model: string, condition: any[] = [], like: any = [])

生成新增请求

- **model** 模块名称
- **condition** 条件数组
- **like** 模糊搜索数组
- **Return** `Observable< any >`

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