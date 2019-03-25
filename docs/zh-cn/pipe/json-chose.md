## 多语言填补显示

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

- **value** 多语言类型的JSON字符串
- **locale** 语言包标识

例如，在接口直接返回多语言类型的JSON字符串

```typescript
const data = `{"zh_cn":"我","en_us":"me"}`;
```

如果指定某个语言为默认的显示

```html
<p>{{data|JSONChose:'en_us'}}</p>
<!-- display me -->
```

当然如果多语言类型的JSON字符串有缺失的语言存在

```typescript
const data = `{"zh_cn":"","en_us":"","ru-ru":"Я"}`;
```

这种情况则显示可以填补的语言

```html
<p>{{data|JSONChose}}</p>
<!-- display Я -->
```
