# AddService

##### `customAction(name: string)`

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/add'`，通过 `name` 修改 `'/add'`

##### `factory(model: string, data: any): Observable<any>`

- 生成新增请求
- `model` 模块名称
- `data` 发送数据

为管理员api服务生成新增请求服务

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