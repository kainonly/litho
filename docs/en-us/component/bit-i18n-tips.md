## I18n Tips

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
```

- **tips** TemplateRef< any >
- **name** FormControlName

Joint attribute directive `bitI18nTipsStyle` is used together

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```