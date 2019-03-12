export function conditionToWhere(condition: any[]) {
  const where = [];
  for (const x of condition) {
    where.push([x.field, x.op, (x.op === 'like' ? `%${x.value}%` : x.value)]);
  }
  return where;
}
