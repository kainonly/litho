## bitSearchStart - Search Start

#### @Directive({selector: '[bitSearchStart]'})

```typescript
@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart: string;
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
    this.storageMap.set('search:' + this.bitSearchStart, this.bit.search).subscribe(() => {
      this.after.emit(true);
    });
  }
}
```

- **@Input() bitSearchStart** `string` search name
- **@Output() after** `EventEmitter< any >` after event

Register search field

```typescript
this.bit.registerSearch('app-index', 
  {field: 'name', op: 'like', value: ''}
).subscribe(() => {

});
```

Also add `click` and `enter` to the component to trigger the search.

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