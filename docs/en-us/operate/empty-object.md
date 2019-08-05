## Empty Object

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

- **object** Object
- **Return** `boolean`

Determine if an object is empty

``` typescript
const test = {};

emptyObject(test); 
// true
```