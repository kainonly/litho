#### customAction(name: string)

- 设置自定义函数名
- `name` 函数名，请求地址默认为 `model+'/edit'`，通过 `name` 修改 `'/edit'`

#### factory(model: string, data: any, field = 'status')

- 生成状态切换请求
- `model` 模块名称
- `data` 状态修改数据引用，必须包含主键与状态字段
- `field` 状态字段名称
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

为管理员接口服务生成分页列表数据请求服务

```typescript
@Injectable()
export class AdminService {
    private model = 'admin';

    constructor(private statusService: StatusService) {}

    status(data: any): Observable<any> {
        return this.statusService.factory(this.model, data);
    }
}
```

在模版中

```html
 <nz-switch [nzCheckedChildren]="bit.l['on']"
            [nzUnCheckedChildren]="bit.l['off']"
            [(ngModel)]="data.status"
            [nzControl]="true"
            (click)="bit.statusChange(adminService.status(data),statusCallback)">
</nz-switch>
```

组件中

```typescript
export class AdminIndexComponent implements OnInit {

  constructor(public bit: BitService,
              public adminService: AdminService,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
      // customize
  }

  statusCallback = (res: any) => {
    switch (res.msg) {
      case 'error:self':
        this.notification.error(this.bit.l['operate_error'], this.bit.l['error_status_self']);
        break;
      default:
        this.notification.error(this.bit.l['operate_error'], this.bit.l['status_error']);
    }
  };
}
```