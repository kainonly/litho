## 对象转Map对象

#### objectToMap(object: any)

```typescript
import {isArray, isObject} from 'util';

export function objectToMap(object: any): Map<any, any> | boolean {
  if (isObject(object) && !isArray(object)) {
    const mapList: Map<any, any> = new Map();
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        mapList.set(key, object[key]);
      }
    }
    return mapList;
  } else {
    return false;
  }
}
```

- **object** 对象
- **Return** `Map<any,any>|false` 

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
