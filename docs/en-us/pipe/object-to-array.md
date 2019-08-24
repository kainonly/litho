## Object To Array

#### @Pipe({name: 'ObjectToArray'})

```typescript
@Pipe({name: 'ObjectToArray'})
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return objectToArray(value);
  }
}
```

- **value** `any` Object
- **Return** `any[]`

For example, suppose an object

```typescript
export class AnyComponent {
    some = {
      car1: 'blue',
      car2: 'red'
    };
}
```

Use in the template

```html
<div *ngFor="let x of some|ObjectToArray">
    <p>{{x.key}}</p>
    <p>{{x.rows}}</p>
</div>
```
