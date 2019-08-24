## objectToArray

- **object** `any` Object
- **Return** `any[]`
  - **key** key
  - **rows** rows data

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
