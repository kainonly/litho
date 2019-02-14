## 判断空数组

#### emptyArray(array: any[])

```typescript
import {isArray} from 'util';

export function emptyArray(array: any[]) {
  if (isArray(array)) {
    return array.length === 0;
  } else {
    return false;
  }
}
```

- **array** 数组
- **Return** `boolean`

判断一个数组是否为空

``` typescript
const test = [];

emptyArray(test); 
// true
```
