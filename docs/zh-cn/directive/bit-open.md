## bitOpen 路由跳转

##### @Directive({selector: '[bitOpen]'})

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

- **@Input() bitOpen** `any[]` 路由跳转处理，`path[0]` 为基础地址，索引大于0则为参数，例如：`['app-edit',1]` 等价于 routerlink 的 `{app-edit}/1`，但包含跨级路由处理
- **@Input() bitTrigger** `click|touch` 触发方式，默认 `click`

例如替代 `routerlink`

```html
<button nz-button nzType="primary" nzSize="small" [bitOpen]="['sys-add']">
    <span>{{bit.l['add']}}</span>
</button>

<a [bitOpen]="['sys-add',data.id]">
    <i nz-icon type="edit"></i> {{bit.l['edit']}}
</a>
```