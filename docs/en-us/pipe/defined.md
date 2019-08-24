## Defined

#### @Pipe({name: 'Defined'})

```typescript
@Pipe({name: 'Defined'})
export class DefinedPipe implements PipeTransform {
  transform(value: any): boolean {
    return value !== undefined;
  }
}
```

- **value** `any` Value
- **Return** `boolean`

For example, suppose there is an undefined attribute

```typescript
export class AnyComponent {
    test;
}
```

Use in the template

```html
<div *ngIf="test|Defined">
    <!-- here no display -->
</div>
```
