## ObjectToMap 对象转Map对象

#### @Pipe({name: 'ObjectToMap'})

```typescript
@Pipe({name: 'ObjectToMap'})
export class ObjectToMapPipe implements PipeTransform {
  transform(value: any): Map<any, any> | boolean {
    return objectToMap(value);
  }
}
```

- **value** `any` 对象
- **Return** `Map`

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
<ng-container *ngIf="some|ObjectToMap as x">
  <p>{{x.get('car1')}}</p>
</ng-container>
```
