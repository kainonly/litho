## 空对象

##### @Pipe({name: 'EmptyObject'})

```typescript
@Pipe({name: 'EmptyObject'})
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    return emptyObject(value);
  }
}
```

- **value** 对象
- **Return** `boolean`

例如，假设存在一个空对象属性

```typescript
export class AnyComponent {
    test = {};
}
```

在模版中判断使用

```html
<div *ngIf="!(test|EmptyObject)">
    <!-- here customize -->
</div>
```