## Empty Array

##### emptyArray(array: any[])

```typescript
emptyArray(array: any[]) {
  if (isArray(array)) {
    return array.length === 0;
  } else {
    return false;
  }
}
```

- **array** array
- **Return** `boolean`

Determine if an array is empty

``` typescript
const test = [];

emptyArray(test); 
// true
```
