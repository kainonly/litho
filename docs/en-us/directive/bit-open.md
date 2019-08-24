## bitOpen - Open Link

#### @Directive({selector: '[bitOpen]'})

```typescript
@Directive({
  selector: '[bitOpen]'
})
export class BitOpenDirective {
  @Input() bitOpen: any[];
  @Input() bitTrigger = 'click';

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  click() {
    if (this.bitTrigger === 'click') {
      this.bit.open(this.bitOpen);
    }
  }

  @HostListener('touchstart')
  touch() {
    if (this.bitTrigger === 'touch') {
      this.bit.open(this.bitOpen);
    }
  }
}
```

- **@Input() bitOpen** `any[]` Route jump processing, `path[0]` is the base address, and the index is greater than 0, for example: `['app-edit',1]` is equivalent to routerlink's `{app-edit}/1`, But including cross-level routing processing
- **@Input() bitTrigger** `click|touch` Trigger mode, default `click`

For example, instead of `routerlink`

```html
<button nz-button nzType="primary" nzSize="small" [bitOpen]="['sys-add']">
    <span>{{bit.l['add']}}</span>
</button>

<a [bitOpen]="['sys-add',data.id]">
    <i nz-icon type="edit"></i> {{bit.l['edit']}}
</a>
```