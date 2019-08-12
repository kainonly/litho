## 工具 (BitService)

##### static: string

静态资源地址，例如 `[src]="bit.static+'any.jpg'"`

##### uploads: string

上传地址, 可以在upload组件上调用 `[nzAction]="bit.uploads"`

##### locale: string

语言包标识, 默认 `zh_cn`，例如 `{{name[bit.locale]}}`

##### l: any

语言包索引，默认 `{}`, 在完成定义语言包之后可直接使用 `l` 获取相关语言，`{{bit.l['name']}}`

##### i18n: string

多语言输入组件当前标识

##### i18nTips: any

多语言输入组件验证提示

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```

##### i18nContain: any[]

多语言输入组件标识数组

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
    {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)" bitFormControlCol nzHasFeedback>
        <bit-i18n-tips #tips name="name"></bit-i18n-tips>
        <input nz-input [placeholder]="bit.l['namePlaceholder']"
                [nz-tooltip]="tips.ref"
                bitI18nTipsStyle
                [formControlName]="x"
                (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
        <nz-form-explain *bitExplain="{
        form:form,
        name:'name.'+x,
        explain:{
            required:bit.l['nameRequire']
        }
        };let msg">{{msg}}</nz-form-explain>
    </nz-form-control>
    </ng-container>
</nz-form-item>
```

##### title: string

当前路由名称，例如 `<nz-card [nzTitle]="bit.title"></nz-card>`

##### breadcrumb: any[]

面包屑数组

```html
<nz-breadcrumb [nzSeparator]="breadcrumbIcon">
    <ng-template #breadcrumbIcon>
    <i nz-icon type="right"></i>
    </ng-template>
    <nz-breadcrumb-item>
    <a routerLink="/">{{bit.l['dashboard']}}</a>
    </nz-breadcrumb-item>
    <nz-breadcrumb-item *ngFor="let x of bit.breadcrumb;last as islast">
    <ng-container *ngIf="islast;else notLast">{{x.name}}</ng-container>
    <ng-template #notLast>
        <a *ngIf="x.routerlink;else notRouterlink" [bitCrossLevel]="x.routerlink">
        {{x.name}}
        </a>
        <ng-template #notRouterlink>{{x.name}}</ng-template>
    </ng-template>
    </nz-breadcrumb-item>
</nz-breadcrumb>
```

##### breadcrumbTop: any

面包屑默认最高级，默认 `0`

##### navActive: any[]

被激活的导航数组

```html
<ul nz-menu
    [nzTheme]="'dark'"
    [nzInlineCollapsed]="collapsed"
    [nzMode]="collapsed?'vertical':'inline'">
    <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: navLists}"></ng-container>
    <ng-template #navTpl let-navs>
    <ng-container *ngFor="let x of navs">
        <ng-container *ngIf="x.routerlink;else notRouterlink">
        <li nz-menu-item
            [nzSelected]="bit.navActive.indexOf(x.id)!==-1"
            [bitOpen]="[x.routerlink]">
            <i nz-icon [type]="x.icon"></i>
            <span class="nav-text">{{x.name}}</span>
        </li>
        </ng-container>
        <ng-template #notRouterlink>
        <li nz-submenu [nzOpen]="bit.navActive.indexOf(x.id)!==-1">
            <span title><i nz-icon [type]="x.icon"></i><span>{{x.name}}</span></span>
            <ul>
            <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: x.children}"></ng-container>
            </ul>
        </li>
        </ng-template>
    </ng-container>
    </ng-template>
</ul>
```

##### search: { field: string, op: string, value: any }[]

搜索处理字段数组

##### listsLoading: boolean

列表正在加载状态, 使用在表格或列表组件中 `[nzLoading]="bit.listsLoading"`

##### pageLimit: number

分页，默认为配置服务 `pageLimit` 的值, 使用在表格或列表组件中，` [nzPageSize]="bit.pageLimit"`

##### listsTotals: number

列表数据总数, `listsTotals` 是由分页列表请求对象自动获取，`[nzTotal]="bit.listsTotals"`

##### listsPageIndex: number

分页索引页, `listsPageIndex` 是个双向绑定属性，可以通过外部去更改分页索引，` [(nzPageIndex)]="bit.lists_page_index"`

##### listsAllChecked: boolean

列表选项框状态为全选, `nzChecked` 是一个双向绑定属性，当全选选择框被动触发改变时，通过它的 `modelChange` 将同步其他数据的选择框状态：

```html
<th nzShowCheckbox
    [(nzChecked)]="bit.listsAllChecked">
</th>
```

##### listsIndeterminate: boolean

列表选项框状态为不完整选择, `nzIndeterminate` 是不完整选择属性，当符合条件时，表头全选选择框将变为该状态：

```html
<th nzShowCheckbox
    [nzIndeterminate]="bit.listsIndeterminate">
</th>
```

##### listsDisabledAction: boolean

列表操作板显示状态, 可在需要的标签中使用，已被选中的总数为 `0` 时，`listsDisabledAction=true`

```html
<button nz-button [disabled]="bit.listsDisabledAction" nzType="primary">
    执行选中的
</button>
```

##### listsCheckedNumber: number

列表选项框选择数量, 显示已被选中的总数：

```html
<p>{{bit.listsCheckedNumber}}</p>
```

##### open(path: any[])

路由跳转处理，`path[0]` 为基础地址，索引大于0则为参数，例如：`['app-edit',1]` 等价于 routerlink 的 `{app-edit}/1`，但包含跨级路由处理

##### crossLevel(selector: string)

路由跨级处理，通过使用open函数进行路由跳转会自动存储多级的路由参数，因此在跨越多级的跳转情况下可使用 `crossLevel` 可实现自动返回跨级，例如面包屑

```html
<nz-breadcrumb-item *ngFor="let x of bit.breadcrumb;last as islast">
<ng-container *ngIf="islast;else notLast">{{x.name}}</ng-container>
    <ng-template #notLast>
        <a *ngIf="x.routerlink;else notRouterlink" [bitCrossLevel]="x.routerlink">
            {{x.name}}
        </a>
        <ng-template #notRouterlink>{{x.name}}</ng-template>
    </ng-template>
</nz-breadcrumb-item>
```

##### back()

返回上一级

##### setLocale(locale: 'zh_cn' | 'en_us')

设置语言包标识

##### equalI18n(i18n: string)

是否与多语言输入组件标识相等

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
    {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)" bitFormControlCol nzHasFeedback>
        <bit-i18n-tips #tips name="name"></bit-i18n-tips>
        <input nz-input [placeholder]="bit.l['namePlaceholder']"
                [nz-tooltip]="tips.ref"
                bitI18nTipsStyle
                [formControlName]="x"
                (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
    </nz-form-control>
    </ng-container>
</nz-form-item>
```

##### resetI18n()

多语言输入组件标识恢复默认值

##### registerLocales(packer: any, common = false)

注册语言包

- **packer** language文件
- **common** 是否为公共语言包

```typescript
const packer = {
  name: ['名称', 'name']
};

ngOnInit() {
    this.bit.registerLocales(packer);
}
```

##### registerSearch(selector: string, ...search: { field: string, op: string, value: any }[]): Observable<any>

注册搜索字段

- **selector** 命名
- **search** `{field: string, value: any, op?: string }[]` 搜索参数
  - **field** 搜索字段名称
  -  **op** 判断类型, 模糊搜索为 `like`,准确搜索为 `=`
  - **value** 搜索值
- **Return** `Observable< any >` 搜索注册完成

```typescript
ngOnInit() {
    this.bit.registerSearch('sys-index', {
        field: 'user', op: 'like', value: ''
    }).subscribe(() => {
        ...
    });
}
```

##### hasSearch(index: number): boolean

该索引下的搜索数组是否存在

```html
<ng-container *ngIf="bit.hasSearch(0)">
  <nz-select [(ngModel)]="bit.search[0].value"
      bitSearchChange="sys-index"
      (after)="getLists(true)">
      <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
  </nz-select>
</ng-container>
```

#####  listsRefreshStatus(lists: any[])

列表选择监听

- **lists** 数据源

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

##### listsCheckAll(event, lists: any[])

列表全选选择监听

- **event** 选择框状态改变触发事件
- **lists** 数据源

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

##### i18nGroup(options?: I18nGroupOptions)

多语言组件数值初始化

- **options** 多语言组件参数
    - **value** 默认值
    - **validate** 同步验证器数组
    - **asyncValidate** 异步验证器数组

表单初始化时设置多语言组件：

```typescript
this.bit.form = this.fb.group({
    name: this.fb.group(this.bit.i18nGroup({
        validate: {
            zh_cn: [Validators.required],
            en_us: [Validators.required]
        }
    })),
});
```

##### i18nUpdateValueAndValidity(form: FormGroup, groupname: string, i18n: string)

多语言组件验证主动更新

- **form** FormGroup 对象
- **groupname** FormGroup 名称
- **i18n** 需更新的多语言组件标识

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```

##### i18nUnionValidator(form: FormGroup, groupname: string) 

多语言组件联合验证，配合 `i18nTips`

- **form** FormGroup 对象
- **groupname** FormGroup 名称

```typescript
this.form = this.fb.group({
    name: this.fb.group(this.bit.i18nGroup({
        validate: {
            zh_cn: [this.nameValidate],
            en_us: [this.nameValidate]
        }
    })),
});

nameValidate = (control: AbstractControl) =>
    this.i18nUnionValidator(this.form, "name"); 
```
