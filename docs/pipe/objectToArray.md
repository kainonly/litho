# ObjectToArray

ObjectToArray 将对象转化为数组

### @Pipe({name: 'ObjectToArray'})

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
<div *ngFor="let x of some|ObjectToArray">
    <p>{{x.key}}</p>
    <p>{{x.rows}}</p>
</div>
```
