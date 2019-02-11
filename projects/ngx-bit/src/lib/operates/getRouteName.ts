export function getRouteName(url: string, start = '%7B', end = '%7D'): string {
  const reg1 = new RegExp(`(?:${start})(.+?)(?=${end})`, 'g');
  return url.match(reg1)[0].replace(start, '');
}
