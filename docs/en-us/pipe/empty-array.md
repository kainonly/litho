## 空数组

##### @Pipe({name: 'EmptyArray'})

```typescript
@Pipe({name: 'EmptyArray'})
export class EmptyArrayPipe implements PipeTransform {
  transform(value: any[]): boolean {
    return emptyArray(value);
  }
}
```

- **value** 数组
- **Return** `boolean`

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
