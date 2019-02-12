# JSONParse

JSONparse 是JSON字符串转化对象管道

### @Pipe({name: 'JSONParse'})

- `value` 传入对象
- `locale` 传入语言包标识

例如，在自定义语言包的情况

```html
<nz-select nzShowSearch nzAllowClear [nzPlaceHolder]="bit.l['role_placeholder']">
    <ng-template ngFor let-x [ngForOf]="role_lists">
        <nz-option [nzLabel]="(x.name|JSONParse:bit.locale)" [nzValue]="x.id"></nz-option>
    </ng-template>
</nz-select>
```