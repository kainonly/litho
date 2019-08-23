## Undefined 未定义

##### @Pipe({name: 'Undefined'})

```typescript
@Pipe({name: 'Undefined'})
export class UndefinedPipe implements PipeTransform {
  transform(value: any): boolean {
    return value === undefined;
  }
}
```

- **value** `any` 数值
- **Return** `boolean`

例如，假设存在一个未定义属性

```typescript
export class AnyComponent {
    test;
}
```

在模版中判断使用

```html
<div *ngIf="test|Undefined">
    <!-- here display -->
</div>
```
