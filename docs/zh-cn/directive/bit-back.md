## bitBack 返回上一级

##### @Directive({selector: '[bitBack]'})

```typescript
@Directive({
  selector: '[bitBack]'
})
export class BitBackDirective {
  @Input() bitTrigger = 'click';

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  click() {
    this.bit.back();
  }


  @HostListener('touchstart')
  touch() {
    if (this.bitTrigger === 'touch') {
      this.bit.back();
    }
  }
}
```

- **@Input() bitTrigger** `click|touch` 触发方式，默认 `click`

添加在按钮中

```html
<button nz-button type="button" bitBack>
    {{bit.l['cancel']}}
</button>
```