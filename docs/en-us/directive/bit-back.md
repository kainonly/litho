## Back

#### @Directive({selector: '[bitBack]'})

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

- **@Input() bitTrigger** `click|touch` Trigger mode, default `click`

Add in button

```html
<button nz-button type="button" bitBack>
    {{bit.l['cancel']}}
</button>
```