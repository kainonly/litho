export function print(text: string, ...vars: any): string {
  if (!text) {
    return '';
  }
  vars.forEach((value: any, index: any) => {
    text = text.replace('$' + index, value);
  });
  return text;
}
