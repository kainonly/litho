export function getSelectorFormUrl(url: string, match: any[]) {
  const regExp = new RegExp(`(?:${match[0]})(.+?)(?=${match[1]})`, 'g');
  return url.match(regExp)[0].replace(match[0], '');
}
