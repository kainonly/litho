## bitSearchChange - Search Change

#### @Directive({selector: '[bitSearchChange]'})

```typescript
@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange: string;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private model: NgModel,
    private storageMap: StorageMap
  ) {
  }

  ngOnInit() {
    this.model.update.pipe(
      switchMap(_ => this.storageMap.set('search:' + this.bitSearchChange, this.bit.search))
    ).subscribe(_ => {
      this.after.emit(true);
    });
  }
}
```

- **@Input() bitSearchChange** `string` search name
- **@Output() after** `EventEmitter< any >` after event

Listening for components that contain `NgModelChange`

```html
<ng-container *ngIf="bit.hasSearch('name')">
  <nz-select [(ngModel)]="bit.search['name'].value"
      bitSearchChange="sys-index"
      (after)="getLists(true)">
      <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
  </nz-select>
</ng-container>
```