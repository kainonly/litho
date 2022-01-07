import { WpxEmptyPipe, WpxJoinPipe, WpxMapPipe, WpxObjectPipe, WpxSortPipe, WpxSplitPipe } from '@weplanx/common';

describe('pipes', () => {
  it('WpxEmptyPipe', () => {
    const pipe = new WpxEmptyPipe();
    expect(pipe.transform('hello')).toBeFalsy();
    expect(pipe.transform(123)).toBeFalsy();
    expect(pipe.transform(true)).toBeFalsy();
    expect(pipe.transform([1, 2, 3])).toBeFalsy();
    expect(pipe.transform({ name: 'kain' })).toBeFalsy();
    expect(pipe.transform(undefined)).toBeTruthy();
    expect(pipe.transform('')).toBeTruthy();
    expect(pipe.transform(0)).toBeTruthy();
    expect(pipe.transform(false)).toBeTruthy();
    expect(pipe.transform(null)).toBeTruthy();
    expect(pipe.transform([])).toBeTruthy();
    expect(pipe.transform({})).toBeTruthy();
  });

  it('WpxJoinPipe', () => {
    const pipe = new WpxJoinPipe();
    expect(pipe.transform(['a', 'b', 'c'], '&')).toEqual('a&b&c');
  });

  it('WpxMapPipe', () => {
    const pipe = new WpxMapPipe();
    const value = new Map([
      ['a', '1'],
      ['c', '3']
    ]);
    expect(pipe.transform(value, 'a')).toEqual('1');
    expect(pipe.transform(value, 'b')).toBeUndefined();
    expect(pipe.transform(value, 'c')).toEqual('3');
  });

  it('WpxObjectPipe', () => {
    const pipe = new WpxObjectPipe();
    expect(pipe.transform('{"name":"kain"}')).toEqual({ name: 'kain' });
    expect(pipe.transform('abcd')).toEqual({});
    expect(pipe.transform('{"name":"kain}')).toEqual({});
  });

  it('WpxSortPipe', () => {
    const pipe = new WpxSortPipe();
    const value = [
      { name: 'a', sort: 3 },
      { name: 'b', sort: 1 },
      { name: 'c', sort: 2 }
    ];
    expect(pipe.transform(value, 'sort')).toEqual([
      { name: 'b', sort: 1 },
      { name: 'c', sort: 2 },
      { name: 'a', sort: 3 }
    ]);
    expect(pipe.transform(value, 'sort', -1)).toEqual([
      { name: 'a', sort: 3 },
      { name: 'c', sort: 2 },
      { name: 'b', sort: 1 }
    ]);
  });

  it('WpxSplitPipe', () => {
    const pipe = new WpxSplitPipe();
    expect(pipe.transform('a,b,c,d', ',')).toEqual(['a', 'b', 'c', 'd']);
    expect(pipe.transform('', '')).toEqual([]);
  });
});
