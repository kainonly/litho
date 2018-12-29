# BitService

BitService 是辅助框架的核心，将使用在组件、模板以及需要的服务类中

### static: string

- 静态资源地址

例如：在组件中使用

```typescript
constructor(public bit: BitService) {
    console.log(this.bit.static)
}
```

例如：在模板中使用

```html
<img [src]="bit.static+'any.jpg'">
```

### uploads: string

- RESTful Api 上传地址
- 详情信息请参考 [上传](zh-cn/plugin/upload)

可以在upload组件上调用此属性：

```html
<nz-upload nzName="anyone"
    [nzAction]="bit.uploads">
</nz-upload>
```

### form: FormGroup

- 组件内FormGroup对象

在当前页内定义主表单：

```html
<form nz-form [formGroup]="bit.form"></form>
```

### forms: any

- 组件内FormGroup组合对象

在当前页内定义主表单：

```html
<form nz-form [formGroup]="bit.forms['add']"></form>
```

### locale: string

- 语言包标识
- 可以在需要语言包的组件或模板中使用，默认 `zh_cn`

例如：在组件中使用

```typescript
name = {
    zh_cn:'我',
    en_us:'me'
}

constructor(public bit: BitService) {
    console.log(this.name[this.bit.locale])
}
```

例如：在模板中使用

```html
<p>{{name[bit.locale]}}<p>
```

### l: any

- 语言包标识，默认 `{}`

在定义好语言包之后可直接使用 `l` 获取相关语言

```html
<p>{{bit.l['name']}}</p>
```

### i18ns: any[]

- 多语言标识，默认 `[]`
- 应用再表单组件多语言化输入切换

例如：多语言输入切换控件

```typescript
// switch = i18ns
<nz-radio-group [(ngModel)]="i18n"
                (ngModelChange)="change.emit($event)"
                nzSize="small">
  <label *ngFor="let x of switch" nz-radio-button [nzValue]="x.i18n">
    <span><b>{{x.name[bit.locale]}}</b></span>
  </label>
</nz-radio-group>
```

### lists_loading: boolean

- 列表正在加载状态
- 使用在表格或列表组件中

在数据还未加载完成时添加加载动画：

```html
<nz-table #table
    [nzLoading]="bit.lists_loading"
    nzSize="middle">
</nz-table>
```

### page_limit: number

- 分页，默认为配置服务 `page_limit`
- 使用在表格或列表组件中

表格中设置分页大小：

```html
<nz-table #table
    [nzPageSize]="bit.page_limit"
    nzSize="middle">
</nz-table>
```

### lists_totals: number

- 列表数据总数
- 使用在表格或列表组件中

`lists_totals` 是由分页列表请求对象自动获取：

```html
<nz-table #table
    [nzTotal]="bit.lists_totals"
    nzSize="middle">
</nz-table>
```

### lists_page_index: number

- 分页索引页，当前页
- 使用在表格或列表组件中

`lists_page_index` 是个双向绑定属性，可以通过外部去更改分页索引：

```html
<nz-table #table
    [(nzPageIndex)]="bit.lists_page_index"
    nzSize="middle">
</nz-table>
```

### lists_all_checked: boolean

- 列表选项框状态为全选
- 使用在表格组件中

`lists_all_checked` 是一个双向绑定属性，当全选选择框被动触发改变时，通过它的 `modelChange` 将同步其他数据的选择框状态：

```html
<nz-table>
    <thead>
        <tr>
            <th nzShowCheckbox
                [(nzChecked)]="bit.lists_all_checked">
            </th>
        </tr>
    </thead>
</nz-table>
```

### lists_indeterminate: boolean

- 列表选项框状态为不完整选择
- 使用在表格组件中

`nzIndeterminate` 是不完整选择属性，当符合条件时，表头全选选择框将变为该状态：

```html
<nz-table>
    <thead>
        <tr>
            <th nzShowCheckbox
                [nzIndeterminate]="bit.lists_indeterminate">
            </th>
        </tr>
    </thead>
</nz-table>
```

### lists_disabled_action: boolean

- 列表操作板显示状态
- 使用在表格组件中

可在需要的标签中使用，已被选中的总数为 `0` 时，`lists_disabled_action=true`

```html
<button nz-button [disabled]="bit.lists_disabled_action" nzType="primary">
    执行选中的
</button>
```

### lists_checked_number: number

- 列表选项框选择数量
- 使用在表格组件中

显示已被选中的总数：

```html
<p>{{bit.lists_checked_number}}</p>
```

### setLocale(locale: 'zh_cn' | 'en_us')

- 语言包标识设置
- `locale` 语言包标识

语言包切换为英文：

```typescript
this.bit.setLocale('en_us');
```

### registerLocales(packer: any, common = false)

- 构建语言包
- `packer` 原始语言包
- `common` 是否为公共语言包

### setMenu(data: any): Observable< boolean >

- 设置菜单源数据
- `data` 从服务器获取的菜单数据

将左侧菜单导航存储在本地存储内，减少请求次数、提高效率，并可以应用再面包屑等扩展中：

```typescript
// main.menu() 为获取菜单请求
this.main.menu().pipe(
    switchMap(data => this.bit.setMenu(data))
).subscribe(status => {
    console.log(status);
})
```

### getMenu(route: string): Observable< any >

- 用路由地址获取对应的菜单数据
- `route` 路由名称

获取路由地址为 `/{admin-index}` 的菜单数据

```typescript
this.bit.getMenu('admin-index').subscribe(data => {
    console.log(data);
});
```

### i18nControls(options?: I18nControlsOptions)

- 输入层多语言数值初始化
- `options` 多语言异步表单参数
    - `value` 数值
    - `validate` 同步验证
    - `asyncValidate` 异步验证

在异步表单初始化时对应这样设置多语言输入控件：

```typescript
this.bit.form = this.fb.group({
    name: this.fb.group(this.bit.i18nControls({
        validate: {
            zh_cn: Validators.required,
            en_us: Validators.required
        }
    })),
});
```

### i18nCommonValidator(group: string)

- 生成多语言输入通用验证结果
- `group` FormGroup 名称
- 返回为空的i18n标识数组

### formExplain(name: string, async = false, field?: string): ValidationErrors | boolean

- 表单验证提示判断
- `name` 表单控件标识
- `async` 是否为包含异步验证
- `field` 组合FormGroup名称

在模版中定义提示判断

```html
<nz-form-explain *ngIf="bit.formExplain('anyone',true)"></nz-form-explain>

<nz-form-explain *ngIf="bit.formExplain('anyone',true,'add')"></nz-form-explain>
```


### explain(name: string, sign: string, field?: string): boolean

- 表单验证类型判断
- `name` 表单控件标识
- `sign` 判断类型
- `field` 组合FormGroup名称

在模版中定义判断类型

```html
<ng-container *ngIf="bit.explain('anyone','required')">
    {{bit.l['anyone_require']}}!
</ng-container>

<ng-container *ngIf="bit.explain('anyone','required','add')">
    {{bit.l['anyone_require']}}!
</ng-container>
```

### submit(event, callback, field?: string)

- 表单提交阻止原生与检测
- `event` 表单event事件
- `callback` 回调事件
- `field` 组合FormGroup名称

定义表单事件

```html
<form nz-form [formGroup]="bit.form" (submit)="bit.submit($event,submit)"></form>

<form nz-form [formGroup]="bit.form" (submit)="bit.submit($event,submit,'add')"></form>
```

### back()

- 返回访问前一页

例如：在组件中使用

```typescript
constructor(public bit: BitService) {
    console.log(this.bit.back())
}
```

例如：在模板中使用

```html
<a (click)="bit.back()"></a>
```

### listsRefreshStatus(lists: any[])

- 列表选择监听
- `lists` 数据源

在表格中的每个子选择框触发变化事件时，判断数据是否全选、不全选或完全不选择：

```html
<nz-table>
    <tbody>
    <tr *ngFor="let data of table.data">
        <td nzShowCheckbox
            [(nzChecked)]="data.checked"
            (nzCheckedChange)="bit.listsRefreshStatus(lists)">
        </td>
    </tr>
    </tbody>
</nz-table>
```

### listsCheckAll(event, lists: any[])

- 列表全选选择监听
- `event` 选择框状态改变触发事件
- `lists` 数据源

在表头命名层全选选择框选中后，同步每个数据的选择框状态

```html
<nz-table>
    <thead>
        <tr>
            <th nzShowCheckbox
                (nzCheckedChange)="bit.listsCheckAll($event,lists)">
            </th>
        </tr>
    </thead>
</nz-table>
```

### statusChange(service: Observable< any >, custom?: any)

- 状态更新
- `service` 状态切换请求
- `custom` 自定义处理错误提示

`main.status` 是一个状态切换请求对象，当监听到状态切换时，同步数据到服务器，对组件这样定义：

```html
<nz-switch [nzCheckedChildren]="bit.l['on']"
            [nzUnCheckedChildren]="bit.l['off']"
            [(ngModel)]="data.status"
            [nzControl]="true"
            (click)="bit.statusChange(anyService.status(data),statusCallback)">
</nz-switch>
```

自定义错误提示，statusCallback 函数

```typescript
statusCallback = (res: any) => {
    switch (res.msg) {
        case 'error:self':
            this.notification.error(this.bit.l['operate_error'], this.bit.l['error_status_self']);
            break;
        default:
            this.notification.error(this.bit.l['operate_error'], this.bit.l['status_error']);
    }
};
```
