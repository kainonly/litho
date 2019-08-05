## 跨级跳转

##### @Directive({selector: '[bitCrossLevel]'})

```typescript
@Directive({
  selector: '[bitCrossLevel]'
})
export class BitCrossLevelDirective {
  @Input() bitCrossLevel: string;
  @Input() bitTrigger = 'click';

  constructor(private bit: BitService) {
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

- **@Input() bitCrossLevel: string** 跨级路由名称
- **@Input() bitTrigger = 'click'** 触发方式 `click|touch`，默认 `touch`

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
    <ng-container *ngIf="islast;else notLast">{{x.name}}</ng-container>
    <ng-template #notLast>
        <a *ngIf="x.routerlink;else notRouterlink" [bitCrossLevel]="x.routerlink">
        {{x.name}}
        </a>
        <ng-template #notRouterlink>{{x.name}}</ng-template>
    </ng-template>
    </nz-breadcrumb-item>
</nz-breadcrumb>
```