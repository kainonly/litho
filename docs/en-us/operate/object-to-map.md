## objectToMap

- **object** `any` Object
- **Return** `Map< any,any > | false` 

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
