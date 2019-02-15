## 监听搜索

#### @Directive({selector: '[bit-search-change]'})

```typescript
@Directive({
  selector: '[bit-search-change]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() searchSelector: string;
  @Output() searchover: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private model: NgModel,
              private storage: LocalStorage) {
  }

  ngOnInit() {
    this.model.update.subscribe(() => {
      this.searchStart();
    });
  }

  private searchStart() {
    this.storage.setItem('search:' + this.searchSelector, this.bit.search).subscribe(() => {
      this.searchover.emit(true);
    });
  }
}
```

- **searchSelector** 搜索命名
- **searchover** 搜索变动之后

监听搜索绑定在 `ngModelChange` 事件

```html
<nz-select [(ngModel)]="bit.search[0].value"
    bit-search-change
    searchSelector="test-index"
    (searchover)="getLists(true)">
    <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
</nz-select>
```