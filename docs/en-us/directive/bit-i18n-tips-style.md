## I18n Tips Style

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

Multi-language prompt styles are unified and used with the component `<bit-i18n-tips #tips name="name"></bit-i18n-tips>`

```html
<bit-i18n-tips #tips name="name"></bit-i18n-tips>
<input nz-input [placeholder]="bit.l['namePlaceholder']"
        [nz-tooltip]="tips.ref"
        bitI18nTipsStyle
        [formControlName]="x"
        (ngModelChange)="bit.i18nUpdateValueAndValidity(form,'name',x)"/>
```