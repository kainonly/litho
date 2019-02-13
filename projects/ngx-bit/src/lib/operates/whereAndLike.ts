export function whereAndLike(search) {
  const condition = {
    where: [],
    like: []
  };
  for (const x of search) {
    if (x.hasOwnProperty('op') && x.value) {
      condition.where.push([
        x.field, x.op, x.value
      ]);
    } else {
      condition.like.push(x);
    }
  }
  return condition;
}
