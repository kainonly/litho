## Tools (BitService)

##### static: string

Static resource address, for example `[src]="bit.static+'any.jpg'"`

##### uploads: string

Upload address, can be called on the upload component `[nzAction]="bit.uploads"`

##### locale: string

Language package identifier, default `zh_cn`, for example `{{name[bit.locale]}}`

##### l: any

Language pack index, default `{}`, you can use `l` to get the relevant language after you finish defining the language pack `{{bit.l['name']}}`

##### i18n: string

Multi-language input component current ID

##### i18nTips: any

Multi-language input component verification prompt

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```

##### i18nContain: any[]

Multi-language input component identification array

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

Current route name, for example `<nz-card [nzTitle]="bit.title"></nz-card>`

##### breadcrumb: any[]

Breadcrumbs array

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

Breadcrumbs default top level, default `0`

##### navActive: any[]

Activated navigation array

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

Search processing field array

##### listsLoading: boolean

The list is loading state, used in a table or list component `[nzLoading]="bit.listsLoading"`

##### pageLimit: number

Pagination, defaults to the value of the configuration service `pageLimit`, used in a table or list component, ` [nzPageSize]="bit.pageLimit"`

##### listsTotals: number

The total number of list data, `listsTotals` is automatically obtained by the paging list request object `[nzTotal]="bit.listsTotals"`

##### listsPageIndex: number

The page index page, `listsPageIndex` is a two-way binding property that can be changed externally by the page index ` [(nzPageIndex)]="bit.lists_page_index"`

##### listsAllChecked: boolean

The list option box state is all selected, and `nzChecked` is a two-way binding property. When the all-selection selection box passively triggers the change, its `modelChange` will synchronize the selection box state of other data:

```html
<th nzShowCheckbox
    [(nzChecked)]="bit.listsAllChecked">
</th>
```

##### listsIndeterminate: boolean

The list option box status is incomplete selection, and `nzIndeterminate` is an incomplete selection attribute. When the condition is met, the header selection box will change to this status:

```html
<th nzShowCheckbox
    [nzIndeterminate]="bit.listsIndeterminate">
</th>
```

##### listsDisabledAction: boolean

The list panel displays the status and can be used in the required tags. When the total number of selected objects is `0`, `listsDisabledAction=true`

```html
<button nz-button [disabled]="bit.listsDisabledAction" nzType="primary">
    Execute selected
</button>
```

##### listsCheckedNumber: number

The list option box selects the quantity, showing the total number of selected:

```html
<p>{{bit.listsCheckedNumber}}</p>
```

##### open(path: any[])

Route jump processing, `path[0]` is the base address, and the index is greater than 0, for example: `['app-edit',1]` is equivalent to routerlink's `{app-edit}/1`, But including cross-level routing processing

##### crossLevel(selector: string)

Routing cross-level processing, routing jumps by using the open function will automatically store multi-level routing parameters, so you can use `crossLevel` to automatically return to cross-level, such as breadcrumbs, when jumping across multiple levels.

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

Back to previous

##### setLocale(locale: 'zh_cn' | 'en_us')

Set language pack ID

##### equalI18n(i18n: string)

Is it equal to the multi-language input component ID

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

##### resetI18n()

Multi-language input component ID restore defaults

##### registerLocales(packer: any, common = false)

注册语言包

- **packer** Language file
- **common** Is it a common language pack

```typescript
const packer = {
  name: ['名称', 'name']
};

ngOnInit() {
    this.bit.registerLocales(packer);
}
```

##### registerSearch(selector: string, ...search: { field: string, op: string, value: any }[]): Observable<any>

Register search field

- **selector** selector
- **search** `{field: string, value: any, op?: string }[]` search param
  - **field** search field
  -  **op** Judgment type, fuzzy search is `like`, accurate search is `=`
  - **value** search value
- **Return** `Observable< any >` Search registration completed

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

Whether the search array under the index exists

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

List selection listener

- **lists** data source

When each sub-selection box in the table triggers a change event, it is determined whether the data is fully selected, not fully selected, or not selected at all:

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

List selection selection listener

- **event** Select box state change trigger event
- **lists** data source

Synchronize the state of each selection box after the header selection layer selection box is selected.

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

Multi-language component numeric initialization

- **options** options
    - **value** value
    - **validate** validate
    - **asyncValidate** async validate

Set up multi-language components when the form is initialized:

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

Multilingual component verification proactive update

- **form** FormGroup
- **groupname** FormGroupName
- **i18n** Multi-language component ID to be updated

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```

##### i18nUnionValidator(form: FormGroup, groupname: string) 

Multi-language component joint verification, with `i18nTips`

- **form** FormGroup
- **groupname** FormGroupName

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
