## 定义

#### @Pipe({name: 'Defined'})

```typescript
@Pipe({name: 'Defined'})
export class DefinedPipe implements PipeTransform {
  transform(value: any): boolean {
    return value !== undefined;
  }
}
```

- **value** 数值
- **Return** `boolean`

例如，假设存在一个未定义属性

```typescript
export class AnyComponent {
    test;
}
```

在模版中判断使用

```html
<div *ngIf="test|Defined">
    <!-- here no display -->
</div>
```
