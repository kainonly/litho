## Object To Map

#### @Pipe({name: 'ObjectToMap'})

```typescript
@Pipe({name: 'ObjectToMap'})
export class ObjectToMapPipe implements PipeTransform {
  transform(value: any): Map<any, any> | boolean {
    return objectToMap(value);
  }
}
```

- **value** `any` Object
- **Return** `Map`

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
<ng-container *ngIf="some|ObjectToMap as x">
  <p>{{x.get('car1')}}</p>
</ng-container>
```
