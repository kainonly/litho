## Locale 语言包显示

##### @Pipe({name: 'Locale'})

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

- **value** `string | object` JSON字符串或JSON
- **locale** `string` 语言包标识

例如，在接口直接返回多语言类型的JSON字符串

```typescript
const data = `{"zh_cn":"我","en_us":"me"}`;
```

如果指定某个语言为默认的显示

```html
<p>{{data|Locale:'en_us'}}</p>
<!-- display me -->
```