export function print(str: string, ...vars: any): string {
  if (!str) {
    return '';
  }
  vars.forEach((value: any, index: any) => {
    str = str.replace('$' + index, value);
  });
  return str;
}
