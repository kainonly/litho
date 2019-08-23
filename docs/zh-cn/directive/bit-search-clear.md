## bitSearchClear 搜索清除

##### @Directive({selector: '[bitSearchClear]'})

```typescript
@Directive({
  selector: '[bitSearchClear]'
})
export class BitSearchClearDirective {
  @Input() bitSearchClear: string;
  @Input() reset: any;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private storageMap: StorageMap
  ) {
  }

  @HostListener('click')
  onclick() {
    for (const i in this.bit.search) {
      if (!this.bit.search.hasOwnProperty(i)) {
        continue;
      }
      const search = this.bit.search[i];
      if (this.reset !== undefined && this.reset.hasOwnProperty(search.field)) {
        search.value = this.reset[search.field];
      } else {
        search.value = '';
      }
    }
    this.storageMap.delete('search:' + this.bitSearchClear).subscribe(() => {
      this.after.emit(true);
    });
  }
}
```

- **@Input() bitSearchClear** `string` 搜索命名
- **@Input() reset** `any` 清除重置的数值
- **@Output() after** `EventEmitter< any >` 清空搜索之后

注册搜索字段

```typescript
this.bit.registerSearch('api-index',
  {field: 'tag', op: '=', value: 0}, 
  {field: 'name', op: 'like', value: ''}
).subscribe(() => {
  
});
```

清空搜索绑定在按钮 `click` 事件

```html
<button nz-button
        bitSearchClear="api-index"
        (after)="getLists(true)">
  {{bit.l['clearSearch']}}
</button>

<button nz-button
        bitSearchClear="api-index"
        [reset]="{tag:0}"
        (after)="getLists(true)">
  {{bit.l['clearSearch']}}
</button>
```