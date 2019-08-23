## bit-i18n-switch 多语言切换器

```html
<bit-i18n-switch (i18nChange)="change($event)"></bit-i18n-switch>
```

- **@Output() i18nChange** `EventEmitter< string >` 监听 **bit.i18n** 值的变化

控制表单内所有多语言输入组件，例如

```html
<ng-template #nzExtra>
  <bit-i18n-switch></bit-i18n-switch>
</ng-template>

<form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
    <nz-form-item formGroupName="name">
        <nz-form-label bitFormLabelCol nzRequired>
            {{bit.l['name']}}
        </nz-form-label>
        <ng-container *ngFor="let x of bit.i18nContain">
        <nz-form-control *ngIf="bit.equalI18n(x)" bitFormControlCol nzHasFeedback>
            <input nz-input [placeholder]="bit.l['namePlaceholder']" [formControlName]="x"/>
        </nz-form-control>
        </ng-container>
    </nz-form-item>
</form>
```