## bitSearchStart 搜索触发

#### @Directive({selector: '[bitSearchStart]'})

```typescript
@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart: string;
  @Input() variable: object;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private storageMap: StorageMap
  ) {
  }

  @HostListener('keydown.enter') onenter() {
    this.searchStart();
  }

  @HostListener('click') onclick() {
    this.searchStart();
  }

  /**
   * search data save storage
   */
  private searchStart() {
    this.storageMap.set(
      'search:' + this.bitSearchStart, !this.variable ? this.bit.search : this.variable
    ).subscribe(() => {
      this.after.emit(true);
    });
  }
}
```

- **@Input() bitSearchStart** `string` 搜索命名
- **@Input() variable** `object` 局部搜索变量
- **@Output() after** `EventEmitter< any >` 开始搜索之后

注册搜索字段

```typescript
this.bit.registerSearch('app-index', 
  {field: 'name', op: 'like', value: ''}
).subscribe(() => {

});
```

同时给组件加入 `click` 与 `enter` 触发搜索

```html
<nz-input-group nzSearch [nzAddOnAfter]="nzAddOnAfter">
  <input type="text" [(ngModel)]="bit.search['name'].value"
          bitSearchStart="app-index"
          (after)="getLists(true)"
          nz-input [placeholder]="bit.l['search']">
</nz-input-group>

<ng-template #nzAddOnAfter>
  <button nz-button nzType="primary" nzSearch
          bitSearchStart="app-index"
          (after)="getLists(true)">
    <i nz-icon type="search"></i>
  </button>
</ng-template>
```