## Undefined

##### @Pipe({name: 'Undefined'})

```typescript
@Pipe({name: 'Undefined'})
export class UndefinedPipe implements PipeTransform {
  transform(value: any): boolean {
    return value === undefined;
  }
}
```

- **value** value
- **Return** `boolean`

For example, suppose there is an undefined attribute

```typescript
export class AnyComponent {
    test;
}
```

Use in the template

```html
<div *ngIf="test|Undefined">
    <!-- here display -->
</div>
```
