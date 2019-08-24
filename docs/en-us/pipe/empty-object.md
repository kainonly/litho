## Empty Object

#### @Pipe({name: 'EmptyObject'})

```typescript
@Pipe({name: 'EmptyObject'})
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    return emptyObject(value);
  }
}
```

- **value** `any` Object
- **Return** `boolean`

For example, suppose there is an empty object attribute

```typescript
export class AnyComponent {
    test = {};
}
```

Use in the template

```html
<div *ngIf="!(test|EmptyObject)">
    <!-- here customize -->
</div>
```