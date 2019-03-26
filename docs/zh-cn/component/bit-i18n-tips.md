## 多语言提示

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
```

- **tips** TemplateRef< any >
- **name** FormControlName

联合属性指令 `bitI18nTipsStyle` 共同使用

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```