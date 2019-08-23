## BitService - Helper

The assistant tool is the main carrier used in the component.

#### static: string

Static resource address, such as `[src]="bit.static+'any.jpg'"`

#### uploads: string

Upload address, you can call `[nzAction]="bit.uploads" on the upload component.

#### locale: string

Language package identifier, default `zh_cn`, for example `{{name[bit.locale]}}`

#### l: any

Language package index, default `{}`, you can use `l` to get the relevant language, `{{bit.l['name']}} after completing the definition of the language pack.

#### i18n: string

Multi-language input component current ID

#### i18nTooltip: object | I18nTooltipOptions

Multi-language input component Tooltip verification prompt

#### i18nContain: any[]

Multi-language input component identification array

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
        {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)" 
                     bitFormControlCol 
                     nzHasFeedback>
        <input nz-input 
               [placeholder]="bit.l['namePlaceholder']"
               [formControlName]="x"/>
    </nz-form-control>
    </ng-container>
</nz-form-item>
```

#### title: string

Current route name, such as `<nz-card [nzTitle]="bit.title"></nz-card>`

#### breadcrumb: any[]

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
        <ng-container *ngIf="islast;else notLast">{{x.name|Locale:bit.locale}}</ng-container>
            <ng-template #notLast>
                <a *ngIf="x.router;else notRouterlink" [bitCrossLevel]="x.key">
                    {{x.name|Locale:bit.locale}}
                </a>
            <ng-template #notRouterlink>{{x.name|Locale:bit.locale}}</ng-template>
        </ng-template>
    </nz-breadcrumb-item>
</nz-breadcrumb>
```

#### breadcrumbTop: any

Breadcrumbs default to the highest level, default `0`

#### navActive: any[]

Activated navigation array

```html
<ul nz-menu
    [nzTheme]="'dark'"
    [nzInlineCollapsed]="collapsed"
    [nzMode]="collapsed?'vertical':'inline'">
    <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: navLists}"></ng-container>
    <ng-template #navTpl let-navs>
        <ng-container *ngFor="let x of navs">
            <ng-container *ngIf="x.router;else notRouter">
                <li nz-menu-item
                    [nzSelected]="bit.navActive.indexOf(x.key)!==-1"
                    [bitOpen]="[x.key]">
                        <i nz-icon [type]="x.icon"></i>
                        <span class="nav-text">{{x.name|Locale:bit.locale}}</span>
                </li>
            </ng-container>
            <ng-template #notRouter>
            <li nz-submenu [nzOpen]="bit.navActive.indexOf(x.key)!==-1">
                <span title><i nz-icon [type]="x.icon"></i><span>{{x.name|Locale:bit.locale}}</span></span>
                <ul>
                    <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: x.children}"></ng-container>
                </ul>
            </li>
            </ng-template>
        </ng-container>
    </ng-template>
</ul>
```

#### search: Search | object = {};

Search field collection

- **search** `Search` Search Collection
  - **< field : string >** `SearchOptions`
    - **field** `string` Search field
    - **op** `string` Judgment type, fuzzy search is `like`, accurate search is `=`
    - **value** `any` Search value

#### listsLoading: boolean

The list is loading, used in the table or list component `[nzLoading]="bit.listsLoading"`

#### pageLimit: number

Pagination, defaults to the value of the configuration service `pageLimit`, used in a table or list component, `[nzPageSize]="bit.pageLimit"`

#### listsTotals: number

The total number of list data, `listsTotals` is automatically obtained by the paging list request object, `[nzTotal]="bit.listsTotals"`

#### listsPageIndex: number

The page index page, `listsPageIndex` is a two-way binding property, you can change the page index by external, `[(nzPageIndex)]="bit.lists_page_index"`

#### listsAllChecked: boolean

The list option box state is all selected, and `nzChecked` is a two-way binding property. When the all-selection selection box passively triggers the change, its `modelChange` will synchronize the selection box state of other data:

```html
<th nzShowCheckbox
    [(nzChecked)]="bit.listsAllChecked">
</th>
```

#### listsIndeterminate: boolean

The list option box status is incomplete selection, and `nzIndeterminate` is an incomplete selection attribute. When the condition is met, the header selection box will change to this status:

```html
<th nzShowCheckbox
    [nzIndeterminate]="bit.listsIndeterminate">
</th>
```

#### listsDisabledAction: boolean

The list panel displays the status and can be used in the required tags. When the total number of selected objects is `0`, `listsDisabledAction=true`

```html
<button nz-button [disabled]="bit.listsDisabledAction" nzType="primary">
    Execute selected
</button>
```

#### listsCheckedNumber: number

The list option box selects the quantity, showing the total number of selected:

```html
<p>{{bit.listsCheckedNumber}}</p>
```

#### open(path: any[])

Route jump processing, `path[0]` is the base address, and the index is greater than 0, for example: `['app-edit',1]` is equivalent to routerlink's `{app-edit}/1`, But including cross-level routing processing

- **path** `any[]` Path array

#### crossLevel(selector: string)

Routing cross-level processing, routing jumps by using the open function will automatically store multi-level routing parameters, so you can use `crossLevel` to automatically return to cross-level, such as breadcrumbs, when jumping across multiple levels.

- **selector** `string` Selector

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

#### back()

Back to previous

#### setLocale(locale: 'zh_cn' | 'en_us')

Set language pack ID

- **locale** `string` Language pack identifier

#### equalI18n(i18n: string)

Is it equal to the multi-language input component ID?

- **i18n** `string` Multi-language identification

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
        {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)" 
                     bitFormControlCol 
                     nzHasFeedback>
        <input nz-input 
               [placeholder]="bit.l['namePlaceholder']"
               [formControlName]="x"/>
    </nz-form-control>
    </ng-container>
</nz-form-item>
```

#### resetI18n()

Multi-language input component ID restore defaults

#### registerLocales(packer: any, common = false)

Registered language pack

- **packer** `any` Language pack
- **common** `boolean` Is it a common language pack?

```typescript
const packer = {
  name: ['名称', 'name']
};

ngOnInit() {
    this.bit.registerLocales(packer);
}
```

#### registerSearch(selector: string, ...search: SearchOptions[]): Observable<any>

Register search field

- **selector** `string` Selector
- **search** `SearchOptions[]` Search Option
  - **field** `string` Search field
  - **op** `string` Judgment type, fuzzy search is `like`, accurate search is `=`
  - **value** `any` Search Value
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

#### hasSearch(field: string): boolean

Whether the field exists in the search

- **field** `string` Field Name

```html
<ng-container *ngIf="bit.hasSearch('user')">
  <nz-select [(ngModel)]="bit.search['user'].value"
      bitSearchChange="sys-index"
      (after)="getLists(true)">
      <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
  </nz-select>
</ng-container>
```

####  listsRefreshStatus(lists: any[])

List selection listener

- **lists** `any[]` data source

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

#### listsCheckAll(event: boolean, lists: any[])

List selection selection listener

- **event** `boolean` Select box state change trigger event
- **lists** `any[]` data source

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

#### i18nGroup(options?: I18nGroupOptions): any

Multi-language component numeric initialization

- **options** `I18nGroupOptions` Multi-language component parameters
    - **value** `object` Default value
      - **\*** `array` a value belonging to a multilingual identifier
    - **validate** `object` Sync validator array
      - **\*** `array` a synchronous validator belonging to a multilingual identifier
    - **asyncValidate** `object` Asynchronous validator array
      - **\*** `array` Asynchronous validator belonging to a multilingual identifier

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