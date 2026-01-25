import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSort'
})
export class SortPipe implements PipeTransform {
  transform<T extends Record<string, unknown>>(value: readonly T[], field: keyof T, sort: 1 | -1 = 1): T[] {
    const copy = value.slice();
    copy.sort((a, b) => compareValues(a[field], b[field]) * sort);
    return copy;
  }
}

function compareValues(left: unknown, right: unknown): number {
  if (left == null || right == null) {
    return 0;
  }
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }
  if (left instanceof Date && right instanceof Date) {
    return left.getTime() - right.getTime();
  }
  const leftText = String(left);
  const rightText = String(right);
  return leftText.localeCompare(rightText);
}
