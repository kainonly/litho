## Empty Array

##### @Pipe({name: 'EmptyArray'})

```typescript
@Pipe({name: 'EmptyArray'})
export class EmptyArrayPipe implements PipeTransform {
  transform(value: any[]): boolean {
    return emptyArray(value);
  }
}
```

- **value** array
- **Return** `boolean`

For example, suppose there is an empty array attribute

```typescript
export class AnyComponent {
    test = [];
}
```

Use in the template

```html
<div *ngIf="!(test|EmptyArray)">
    <!-- here customize -->
</div>
```
