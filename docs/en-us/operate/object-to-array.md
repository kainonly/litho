## Object To Array

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

- **object** Object
- **Return** `any[]`
  - **key** key
  - **rows** value

Convert an object to an array

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
