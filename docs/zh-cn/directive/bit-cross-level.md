## bitCrossLevel 跨级跳转

#### @Directive({selector: '[bitCrossLevel]'})

```typescript
@Directive({
  selector: '[bitCrossLevel]'
})
export class BitCrossLevelDirective {
  @Input() bitCrossLevel: string;
  @Input() bitTrigger = 'click';

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  click() {
    if (this.bitTrigger === 'click') {
      this.bit.crossLevel(this.bitCrossLevel);
    }
  }

  @HostListener('touchstart')
  touch() {
    if (this.bitTrigger === 'touch') {
      this.bit.crossLevel(this.bitCrossLevel);
    }
  }
}
```

- **@Input() bitCrossLevel** `string` 跨级路由名称
- **@Input() bitTrigger** `click|touch` 触发方式，默认 `click`

例如使用在面包屑

```html
<nz-breadcrumb [nzSeparator]="breadcrumbIcon">
  <ng-template #breadcrumbIcon>
    <i nz-icon type="right"></i>
  </ng-template>
  <nz-breadcrumb-item>
    <a routerLink="/">{{bit.l['dashboard']}}</a>
  </nz-breadcrumb-item>
  <nz-breadcrumb-item *ngFor="let x of bit.breadcrumb;last as islast">
    <ng-container *ngIf="islast;else notLast">{{x.name|Locale:bit.locale}}</ng-container>
    <ng-template #notLast>
      <a *ngIf="x.router;else notRouterlink" [bitCrossLevel]="x.key">
        {{x.name|Locale:bit.locale}}
      </a>
      <ng-template #notRouterlink>{{x.name|Locale:bit.locale}}</ng-template>
    </ng-template>
  </nz-breadcrumb-item>
</nz-breadcrumb>
```