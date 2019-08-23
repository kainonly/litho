## Join 数组拼接为字符串

##### @Pipe({name: 'Join'})

```typescript
@Pipe({name: 'Join'})
export class JoinPipe implements PipeTransform {
  transform(origin: string[], symbol: string): string {
    return origin.join(symbol);
  }
}
```

- **origin** `string[]` 字符串数组
- **symbol** `string` 拼接符号
- **Return** `string`

例如，在一些场景下存在字符串数组

```typescript
const data = ['a1', 'b2', 'c3'];
```

那么可以通过该管道进行字符串拼接

```html
<p>{{data|Join:','}}</p>
<!-- display a1,b2,c3 -->
```