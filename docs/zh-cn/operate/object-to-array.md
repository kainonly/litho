## objectToArray 对象转数组

- **object** `any` 对象
- **Return** `any[]`
  - **key** 原主键
  - **rows** 原键值

将一个对象转为数组

```typescript
const some = {
  car1: 'blue',
  car2: 'red'
};
objectToArray(some);
// [
//    {key: 'car1', rows: 'blue'},
//    {key: 'car2', rows: 'red'}
// ]
```
