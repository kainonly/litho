export function privacy(text: string, start: number, end: number): string {
  const match = text.slice(start, end);
  return text.replace(match, '*'.repeat(match.length));
}
