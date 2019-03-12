export function conditionToWhere(condition: any[]) {
  const where = [];
  for (const x of condition) {
    if (!(x.value === '' || x.value === 0 || !x.value)) {
      where.push([x.field, x.op, (x.op === 'like' ? `%${x.value}%` : x.value)]);
    }
  }
  return where;
}
