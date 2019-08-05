## 判断空对象

##### emptyObject(object: any)

```typescript
emptyObject(object: any): boolean {
  if (isObject(object) && !isArray(object)) {
    return Object.keys(object).length === 0;
  } else {
    return false;
  }
}
```

- **object** 对象
- **Return** `boolean`

判断一个对象是否为空

``` typescript
const test = {};

emptyObject(test); 
// true
```