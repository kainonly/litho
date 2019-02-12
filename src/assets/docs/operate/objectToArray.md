# 对象转化数组

objectToArray 将对象转化为数组的函数

### objectToArray(object: any)

- `object` 对象
- 返回 `any[]`
  - `key` 原主键
  - `rows` 原键值

例如，这么使用

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
