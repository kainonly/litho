export function print(str: string, ...vars: any): string {
  if (!str) {
    return '';
  }
  vars.forEach((value, index) => {
    str = str.replace('$' + index, value);
  });
  return str;
}
