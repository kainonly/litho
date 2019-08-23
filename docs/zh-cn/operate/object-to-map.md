## objectToMap 对象转Map对象

- **object** `any` 对象
- **Return** `Map< any,any > | false` 

将一个对象转为Map对象

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
