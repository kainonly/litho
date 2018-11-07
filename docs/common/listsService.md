# ListsService

ListsService 是分页数据接口请求服务

### customAction(name: string)

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/lists'`，通过 `name` 修改 `'/lists'`

### factory(model: string, condition: any[] = [], like: any = [], refresh?: boolean): Observable< any >

- 生成新增请求
- `model` 模块名称
- `condition` 条件数组
- `like` 模糊搜索数组
- `refresh` 刷新参数，将分页、列表等初始化

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

    constructor(private listsService: ListsService) {}

    lists(search: any, refresh: boolean): Observable<any> {
        return this.listsService.factory(this.model, [], search, refresh);
    }
}
```

模糊搜索调用

```typescript
this.admin.lists([{field: 'username', value: 'o'}], true);
```