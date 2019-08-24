## Locale - Locale Displa

#### @Pipe({name: 'Locale'})

```typescript
@Pipe({name: 'Locale'})
export class LocalePipe implements PipeTransform {
  transform(value: string | object, locale: string): string {
    try {
      if (typeof value === 'string') {
        const data = JSON.parse(value);
        return data[locale];
      } else {
        return value[locale];
      }
    } catch (e) {
      return '';
    }
  }
}
```

- **value** `string | object` JSON string or JSON
- **locale** `string` Language pack identifier

For example, returning a multilingual JSON string directly at the interface

```typescript
const data = `{"zh_cn":"我","en_us":"me"}`;
```

If you specify a language as the default display

```html
<p>{{data|Locale:'en_us'}}</p>
<!-- display me -->
```