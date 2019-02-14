#### @Pipe({name: 'EmptyArray'})

- `value` 传入数组

例如，假设存在一个空数组属性

```typescript
export class AnyComponent {
    test = [];
}
```

在模版中判断使用

```html
<div *ngIf="!(test|EmptyArray)">
    <!-- here customize -->
</div>
```
