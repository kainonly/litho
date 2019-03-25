## 对象转数组

##### objectToArray(object: any)

```typescript
objectToArray(object: any): any[] {
  if (isObject(object) && !isArray(object)) {
    const array = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        array.push({
          key,
          rows: object[key]
        });
      }
    }
    return array;
  } else {
    return [];
  }
}
```

- **object** 对象
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
