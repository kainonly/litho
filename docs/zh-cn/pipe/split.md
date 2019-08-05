## 字符串分割为数组

##### @Pipe({name: 'Split'})

```typescript
@Pipe({name: 'Split'})
export class SplitPipe implements PipeTransform {
  transform(text: string, symbol: string): string[] {
    return text.split(symbol);
  }
}
```

- **text** 字符串
- **symbol** 分割符号
- **Return** `string`

例如，在一些场景下存在字符串

```typescript
const str = 'a1|b2|c3';
```

那么可以通过该管道进行字符串分割

```html
<p>{{(str|Split:'|')[0]}}</p>
<!-- display a1 -->
```