## JSONParse JSON字符串转数组

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

- **value** `string` JSON字符串
- **chkey** `string` 子键

例如，在接口直接返回JSON字符串数组

```typescript
const data = `{"name":"bit","version":1}`;
```

在这种情况下直接使用管道可以减少遍历处理

```html
<p>{{data|JSONParse:name}}</p>
<!-- display bit -->
```