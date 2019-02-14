## 搜索条件筛选

#### whereAndLike(search: any)

```typescript
export function whereAndLike(search: any) {
  const condition = {
    where: [],
    like: []
  };
  for (const x of search) {
    if (!x.value) {
      continue;
    }
    if (x.hasOwnProperty('op')) {
      condition.where.push([
        x.field, x.op, x.value
      ]);
    } else {
      condition.like.push(x);
    }
  }
  return condition;
}
```

注册的搜索条件中存在多种方式，则使用该函数在请求服务内进行筛选

```typescript
// search = this.bit.search
lists(search: any, refresh: boolean): Observable<any> {
    const {where, like} = whereAndLike(search);
    return this.listsService.factory(this.model, where, like, refresh).pipe(map(res => {
        if (!res.error) {
            return res.data.lists;
        } else {
            return [];
        }
    }));
}
```