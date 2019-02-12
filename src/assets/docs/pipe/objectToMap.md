# ObjectToMap

ObjectToMap 将对象转化为Map对象

### @Pipe({name: 'ObjectToMap'})

- `value` 传入对象

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
