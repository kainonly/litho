## 开始搜索

#### @Directive({selector: '[bit-search-start]'})

```typescript
@Directive({
  selector: '[bit-search-start]'
})
export class BitSearchStartDirective {
  @Input() searchSelector: string;
  @Output() searchover: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private storage: LocalStorage) {
  }

  @HostListener('keydown.enter') onenter() {
    this.searchStart();
  }

  @HostListener('click') onclick() {
    this.searchStart();
  }

  private searchStart() {
    this.storage.setItem('search:' + this.searchSelector, this.bit.search).subscribe(() => {
      this.searchover.emit(true);
    });
  }
}
```

- **searchSelector** 搜索命名
- **searchover** 开始搜索之后

注册搜索字段

```typescript
this.bit.registerSearch('test-index', {
  field: 'name', value: ''
}).subscribe(() => {
  // after
});
```

开始搜索绑定在输入框 `enter` 事件

```html
<input *ngIf="bit.search[0]!==undefined" type="text" [(ngModel)]="bit.search[0].value"
  bit-search-start
  searchSelector="test-index"
  (searchover)="getLists(true)"
  nz-input>
```

开始搜索绑定在按钮 `click` 事件

```html
<button nz-button nzType="primary" nzSearch
  bit-search-start
  searchSelector="test-index"
  (searchover)="getLists(true)">
  <i nz-icon type="search"></i>
</button>
```