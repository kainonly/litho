# AddService

AddService 新增接口请求服务

### customAction(name: string)

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/add'`，通过 `name` 修改 `'/add'`

### factory(model: string, data: any): Observable< any >

- 生成新增请求
- `model` 模块名称
- `data` 发送数据

为管理员服务生成新增请求接口

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private addService: AddService) {}

    add(data: any) {
        return this.addService.factory(this.model, data);
    }
}
```

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

在组件中使用

```typescript
export class AdminAddComponent implements OnInit {
  constructor(private adminService: AdminService) {
  }

  submit = (data) => {
    this.adminService.add(data).subscribe((res) => {
      // res
    });
  };
}
```