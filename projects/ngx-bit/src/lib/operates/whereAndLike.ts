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
