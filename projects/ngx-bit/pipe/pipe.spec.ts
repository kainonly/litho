import {
  EmptyPipe,
  JoinPipe, ObjectPipe, PrintPipe,
  PrivacyPipe,
  SplitPipe
} from 'ngx-bit/pipe';

describe('pipe module', () => {
  it('Test EmptyPipe', () => {
    const pipe = new EmptyPipe();
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

  it('Test JoinPipe', () => {
    const pipe = new JoinPipe();
    expect(pipe.transform(['a', 'b', 'c'], '&')).toEqual('a&b&c');
  });

  it('Test SplitPipe', () => {
    const pipe = new SplitPipe();
    expect(pipe.transform('a,b,c,d', ',')).toEqual(['a', 'b', 'c', 'd']);
    expect(pipe.transform('', '')).toEqual([]);
  });

  it('Test ObjectPipe', () => {
    const pipe = new ObjectPipe();
    expect(pipe.transform('{"name":"kain"}')).toEqual({ name: 'kain' });
    expect(pipe.transform('asd')).toEqual('');
    const json = '{"zh_cn":"你好","en_us":"Hello"}';
    expect(pipe.transform(json, 'zh_cn')).toEqual('你好');
    expect(pipe.transform(json, 'en_us')).toEqual('Hello');
    const data = {
      zh_cn: '你好',
      en_us: 'Hello'
    };
    expect(pipe.transform(data, 'zh_cn')).toEqual('你好');
    expect(pipe.transform(data, 'en_us')).toEqual('Hello');
  });

  it('Test PrintPipe', () => {
    const pipe = new PrintPipe();
    expect(pipe.transform('', [])).toEqual('');
    expect(pipe.transform(
      '$0 是遵循 $1 设计规范的 $2 组件库',
      ['ng-zorro-antd', 'Ant Design', 'Angular UI']
    )).toEqual('ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库');
  });

  it('Test PrivacyPipe', () => {
    const pipe = new PrivacyPipe();
    expect(pipe.transform('123456789', '3,6')).toEqual('123***789');
  });
});
