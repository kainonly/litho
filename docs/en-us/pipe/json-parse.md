## JSON Parse

#### @Pipe({name: 'JSONParse'})

```typescript
@Pipe({name: 'JSONParse'})
export class JsonParsePipe implements PipeTransform {
  transform(value: string, chkey?: any): any {
    try {
      return chkey !== undefined ? JSON.parse(value)[chkey] : JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}
```

- **value** `string` JSON string
- **chkey** `string` children key

For example, returning a JSON string array directly on the interface

```typescript
const data = `{"name":"bit","version":1}`;
```

In this case, using pipes directly can reduce traversal processing.

```html
<p>{{data|JSONParse:name}}</p>
<!-- display bit -->
```