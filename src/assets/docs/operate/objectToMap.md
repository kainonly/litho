### objectToMap(object: any)

- `object` 对象
- 返回 `Map<any,any>` 或 `false`

例如，这么使用

```typescript
const some = {
  car1: 'blue',
  car2: 'red'
};
const t = objectToMap(some);
if(t) {
  console.log(t.get('car1'));
  // blue
}
```
