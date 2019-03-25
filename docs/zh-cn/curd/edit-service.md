## 编辑数据请求 - EditService

#### customAction(name: string)

设置自定义函数名

- **name** 函数名，请求地址默认为 `model+'/edit'`，通过 `name` 修改 `'/edit'`

#### factory(model: string, data: any, condition: any = [])

生成新增请求

- **model** 模块名称
- **data** 发送数据
- **condition** 条件数组
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

例如：请求数据包含id无需使用条件数组

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private editService: EditService) {}

    edit(data: any): Observable<any> {
        return this.editService.factory(this.model, data);
    }
}
```

例如：请求数组需要其他条件时，需要定义条件数组

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private editService: EditService) {}

    editSpecial(data: any, condition: any): Observable<any> {
        return this.editService.factory(this.model, data, condition);
    }
}
```

调用编辑请求

```typescript
this.admin.editSpecial({name: 'two'}, [
    ['uuid', '=', 'xxx']
]);
```