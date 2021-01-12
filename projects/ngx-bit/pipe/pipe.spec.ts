import {
  EmptyPipe,
  JoinPipe, ObjectPipe,
  PrivacyPipe,
  SplitPipe
} from 'ngx-bit/pipe';

describe('pipe', () => {
  it('Test EmptyPipe', () => {
    const pipe = new EmptyPipe();
    expect(pipe.transform([1, 2, 3])).toBeFalsy();
    expect(pipe.transform([])).toBeTruthy();
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

  // it('Test ObjectPipe', () => {
  //   const pipe = new ObjectPipe();
  //   expect(pipe.transform('{"name":"kain"}')).toEqual({ name: 'kain' });
  //   expect(pipe.transform('asd')).toEqual({});
  // });

  // it('Test LocalePipe', () => {
  //   const pipe = new JsonPipe();
  //   const json = '{"zh_cn":"你好","en_us":"Hello"}';
  //   expect(pipe.transform(json, 'zh_cn')).toEqual('你好');
  //   expect(pipe.transform(json, 'en_us')).toEqual('Hello');
  //   const obj = {
  //     zh_cn: '你好',
  //     en_us: 'Hello'
  //   };
  //   expect(pipe.transform(obj, 'zh_cn')).toEqual('你好');
  //   expect(pipe.transform(obj, 'en_us')).toEqual('Hello');
  //   const str = 'abc';
  //   expect(pipe.transform(str, 'zh_cn')).toEqual('');
  // });

  it('Test PrivacyPipe', () => {
    const pipe = new PrivacyPipe();
    expect(pipe.transform('123456789', '3,6')).toEqual('123***789');
  });
});
