## Locale Fill

##### @Pipe({name: 'JSONChose'})

```typescript
@Pipe({name: 'JSONChose'})
export class JsonChosePipe implements PipeTransform {
  transform(value: string, locale?: any): any {
    try {
      if (locale !== undefined) {
        const data = JSON.parse(value);
        if (!data[locale]) {
          for (const i in data) {
            if (data.hasOwnProperty(i) && data[i]) {
              return data[i];
            }
          }
        } else {
          return data[locale];
        }
      } else {
        return JSON.parse(value);
      }
    } catch (e) {
      return {};
    }
  }
}
```

- **value** Multi-language type JSON string
- **locale** Language pack identifier

For example, returning a multilingual JSON string directly at the interface

```typescript
const data = `{"zh_cn":"我","en_us":"me"}`;
```

If you specify a language as the default display

```html
<p>{{data|JSONChose:'en_us'}}</p>
<!-- display me -->
```

Of course if a multi-language type of JSON string has a missing language

```typescript
const data = `{"zh_cn":"","en_us":"","ru-ru":"Я"}`;
```

This situation shows the language that can be filled

```html
<p>{{data|JSONChose}}</p>
<!-- display Я -->
```
