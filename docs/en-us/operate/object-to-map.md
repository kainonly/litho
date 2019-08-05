## Object To Map

##### objectToMap(object: any)

```typescript
objectToMap(object: any): Map<any, any> | boolean {
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

- **object** Object
- **Return** `Map<any,any>|false` 

Convert an object to a Map object

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
