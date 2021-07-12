import { of } from 'rxjs';
import { asyncValidator, empty, print, privacy } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';

describe('operates module', () => {
  it('Test asyncValidator', done => {
    asyncValidator(of(true))
      .pipe(
        switchMap(result => {
          expect(result).toEqual(null);
          return asyncValidator(of(false));
        })
      )
      .subscribe(result => {
        expect(result).toEqual({ error: true, duplicated: true });
        done();
      });
  });

  it('Test empty', () => {
    expect(empty('hello')).toBeFalsy();
    expect(empty(123)).toBeFalsy();
    expect(empty(true)).toBeFalsy();
    expect(empty([1, 2, 3])).toBeFalsy();
    expect(empty({ name: 'kain' })).toBeFalsy();
    expect(empty(undefined)).toBeTruthy();
    expect(empty('')).toBeTruthy();
    expect(empty(0)).toBeTruthy();
    expect(empty(false)).toBeTruthy();
    expect(empty(null)).toBeTruthy();
    expect(empty([])).toBeTruthy();
    expect(empty({})).toBeTruthy();
  });

  it('Test print', () => {
    expect(print('')).toEqual('');
    expect(print('$0 是遵循 $1 设计规范的 $2 组件库', 'ng-zorro-antd', 'Ant Design', 'Angular UI')).toEqual(
      'ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库'
    );
  });

  it('Test privacy', () => {
    expect(privacy('123456789', 3, 6)).toEqual('123***789');
  });
});
