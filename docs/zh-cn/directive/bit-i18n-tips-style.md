## 多语言提示样式

##### @Directive({selector: '[bitI18nTipsStyle]'})

```typescript
@Directive({
  selector: '[bitI18nTipsStyle]'
})
export class BitI18nTipsStyleDirective {
  constructor(private nzTooltipDirective: NzTooltipDirective) {
    nzTooltipDirective.nzPlacement = 'topLeft';
    nzTooltipDirective.nzTrigger = 'focus';
  }
}
```

多语言提示样式统一，与组件 `<bit-i18n-tips #tips name="name"></bit-i18n-tips>` 配合使用

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```