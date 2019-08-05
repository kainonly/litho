## Join

##### @Pipe({name: 'Join'})

```typescript
@Pipe({name: 'Join'})
export class JoinPipe implements PipeTransform {
  transform(origin: string[], symbol: string): string {
    return origin.join(symbol);
  }
}
```

- **origin** array
- **symbol** symbol string
- **Return** `string`

For example, there are strings of strings in some scenarios

```typescript
const data = ['a1', 'b2', 'c3'];
```

Then you can string splicing through the pipe

```html
<p>{{data|Join:','}}</p>
<!-- display a1,b2,c3 -->
```