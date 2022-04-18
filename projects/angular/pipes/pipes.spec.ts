import {
  WpxAssetsPipe,
  WpxEmptyPipe,
  WpxJoinPipe,
  WpxMapPipe,
  WpxObjectPipe,
  WpxService,
  WpxSortPipe,
  WpxSplitPipe
} from '@weplanx/ng';
import { TestBed } from '@angular/core/testing';

describe('测试管道', () => {
  it('WpxAssetsPipe', () => {
    const wpx = TestBed.inject(WpxService);
    wpx.setAssets('https://cdn.kainonly.com');
    const pipe = new WpxAssetsPipe(wpx);
    expect(pipe.transform([], {})).toEqual('');
    expect(pipe.transform(['20210203', 'a45141d1-e535-409a-9ae6-5aef38c0d69b'])).toEqual(
      'https://cdn.kainonly.com/20210203/a45141d1-e535-409a-9ae6-5aef38c0d69b'
    );
    expect(pipe.transform(['20210203', 'a45141d1-e535-409a-9ae6-5aef38c0d69b'], { params: { ext: 'jpeg' } })).toEqual(
      'https://cdn.kainonly.com/20210203/a45141d1-e535-409a-9ae6-5aef38c0d69b?ext=jpeg'
    );
    expect(pipe.transform(['20210203', 'a45141d1-e535-409a-9ae6-5aef38c0d69b'], { css: true })).toEqual(
      'url("https://cdn.kainonly.com/20210203/a45141d1-e535-409a-9ae6-5aef38c0d69b")'
    );
  });

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
    expect(pipe.transform([], 'sort')).toEqual([]);
    const value1 = [
      { name: 'a', sort: 3 },
      { name: 'b', sort: 1 },
      { name: 'c', sort: 2 }
    ];
    expect(pipe.transform(value1, 'sort')).toEqual([
      { name: 'b', sort: 1 },
      { name: 'c', sort: 2 },
      { name: 'a', sort: 3 }
    ]);
    expect(pipe.transform(value1, 'sort', -1)).toEqual([
      { name: 'a', sort: 3 },
      { name: 'c', sort: 2 },
      { name: 'b', sort: 1 }
    ]);
    const value2 = [{ name: 'a', sort: 2 }, { name: 'b' }, { name: 'c', sort: 2 }];
    expect(pipe.transform(value2, 'sort')).toEqual(value2);
  });

  it('WpxSplitPipe', () => {
    const pipe = new WpxSplitPipe();
    expect(pipe.transform('a,b,c,d', ',')).toEqual(['a', 'b', 'c', 'd']);
    expect(pipe.transform('', '')).toEqual([]);
  });
});
