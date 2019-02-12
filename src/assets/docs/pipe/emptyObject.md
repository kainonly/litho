# EmptyObject

EmptyObject 是判断是否为空对象的管道

### @Pipe({name: 'EmptyObject'})

- `value` 传入对象

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