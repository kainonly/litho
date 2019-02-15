## 清空搜索

#### @Directive({selector: '[bit-search-clear]'})

```typescript
@Directive({
  selector: '[bit-search-clear]'
})
export class BitSearchClearDirective {
  @Input() searchSelector: string;
  @Output() searchclear: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private storage: LocalStorage) {
  }

  @HostListener('click')
  onclick() {
    for (const x of this.bit.search) {
      x.value = '';
    }
    this.storage.removeItem('search:' + this.searchSelector).subscribe(() => {
      this.searchclear.emit(true);
    });
  }
}
```

- **searchSelector** 搜索命名
- **searchclear** 清空搜索之后

清空搜索绑定在按钮 `click` 事件

```html
<button nz-button
  bit-search-clear
  searchSelector="test-index"
  (searchclear)="getLists(true)">
  清除搜索
</button>
```