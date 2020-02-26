## bitSearchChange 搜索监听

#### @Directive({selector: '[bitSearchChange]'})

```typescript
@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange: string;
  @Input() variable: object;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private model: NgModel,
    private storageMap: StorageMap
  ) {
  }

  ngOnInit() {
    this.model.update.pipe(
      switchMap(_ =>
        this.storageMap.set('search:' + this.bitSearchChange, !this.variable ? this.bit.search : this.variable
        )
      )
    ).subscribe(_ => {
      this.after.emit(true);
    });
  }
}
```

- **@Input() bitSearchChange** `string` 搜索命名
- **@Input() variable** `object` 局部搜索变量
- **@Output() after** `EventEmitter< any >` 搜索变动之后

监听包含 `NgModelChange` 的组件中

```html
<ng-container *ngIf="bit.hasSearch('name')">
  <nz-select [(ngModel)]="bit.search['name'].value"
      bitSearchChange="sys-index"
      (after)="getLists(true)">
      <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
  </nz-select>
</ng-container>
```