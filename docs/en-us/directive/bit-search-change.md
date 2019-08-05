## Search Change

##### @Directive({selector: '[bitSearchChange]'})

```typescript
@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange: string;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private model: NgModel,
              private storage: LocalStorage) {
  }

  ngOnInit() {
    this.model.update.pipe(
      switchMap(_ => this.storage.setItem('search:' + this.bitSearchChange, this.bit.search))
    ).subscribe(_ => {
      this.after.emit(true);
    });
  }
}
```

- **@Input() bitSearchChange: string** search name
- **@Output() after: EventEmitter< any >** after event

Listening for components that contain `NgModelChange`

```html
<ng-container *ngIf="bit.hasSearch(0)">
  <nz-select [(ngModel)]="bit.search[0].value"
      bitSearchChange="sys-index"
      (after)="getLists(true)">
      <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
  </nz-select>
</ng-container>
```