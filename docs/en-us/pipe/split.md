## Split

#### @Pipe({name: 'Split'})

```typescript
@Pipe({name: 'Split'})
export class SplitPipe implements PipeTransform {
  transform(text: string, symbol: string): string[] {
    return text.split(symbol);
  }
}
```

- **text** `string` string
- **symbol** `string` symbol string
- **Return** `string`

For example, there are strings in some scenarios

```typescript
const str = 'a1|b2|c3';
```

Then you can split the string through the pipe

```html
<p>{{(str|Split:'|')[0]}}</p>
<!-- display a1 -->
```