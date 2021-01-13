import { of } from 'rxjs';
import {
  asyncValidator,
  empty,
  factoryLocales,
  getQuerySchema,
  getSelectorFormUrl, print, privacy
} from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';
import { environment } from '../simulation/environment';

describe('operates module', () => {
  it('Test asyncValidator', (done) => {
    asyncValidator(of(true)).pipe(
      switchMap(result => {
        expect(result).toEqual(null);
        return asyncValidator(of(false));
      })
    ).subscribe(result => {
      expect(result).toEqual({ error: true, duplicated: true });
      done();
    });
  });

  it('Test factoryLocales', (done) => {
    import('../simulation/common.language').then(result => {
      const lang = factoryLocales(result.default, environment.bit.locale.mapping);
      expect(lang.zh_cn).not.toBeNull();
      expect(lang.zh_cn.dashboard).toEqual('仪表盘');
      expect(lang.en_us).not.toBeNull();
      expect(lang.en_us.dashboard).toEqual('Dashboard');
      done();
    });
  });

  it('Test getQuerySchema', () => {
    let schema = getQuerySchema([
      { field: 'username', op: '=', value: '' }
    ]);
    expect(schema).toEqual([]);
    schema = getQuerySchema([
      { field: 'username', op: '=', value: '', exclude: [] }
    ]);
    expect(schema).toEqual([['username', '=', '']]);
    schema = getQuerySchema([
      { field: 'username', op: '=', value: 'kain' }
    ]);
    expect(schema).toEqual([['username', '=', 'kain']]);
    schema = getQuerySchema([
      { field: 'username', op: '=', value: null },
      { field: 'type', op: '=', value: 0 },
      { field: 'ids', op: 'in', value: [] },
      { field: 'error', op: '=', value: {} }
    ]);
    expect(schema).toEqual([]);
  });

  it('Test getSelectorFormUrl', () => {
    let key = getSelectorFormUrl('/%7Bacl-index%7D', ['%7B', '%7D']);
    expect(key).toEqual('acl-index');
    key = getSelectorFormUrl('/%7Bacl-edit%7D/1', ['%7B', '%7D']);
    expect(key).toEqual('acl-edit');
    key = getSelectorFormUrl('/%7Bacl-edit%7D/1/2', ['%7B', '%7D']);
    expect(key).toEqual('acl-edit');
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
    expect(print(
      '$0 是遵循 $1 设计规范的 $2 组件库',
      'ng-zorro-antd', 'Ant Design', 'Angular UI'
    )).toEqual('ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库');
  });

  it('Test privacy', () => {
    expect(privacy('123456789', 3, 6)).toEqual('123***789');
  });

});
