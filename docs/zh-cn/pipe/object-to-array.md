## 对象转数组

#### @Pipe({name: 'ObjectToArray'})

```typescript
@Pipe({name: 'ObjectToArray'})
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return objectToArray(value);
  }
}
```

- **value** 对象
- **Return** `any[]`

例如，假设一个对象

```typescript
export class AnyComponent {
    some = {
      car1: 'blue',
      car2: 'red'
    };
}
```

在模版中判断使用

```html
<div *ngFor="let x of some|ObjectToArray">
    <p>{{x.key}}</p>
    <p>{{x.rows}}</p>
</div>
```
