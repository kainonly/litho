import { of } from 'rxjs';
import {
  asyncValidator,
  factoryLocales,
  getQuerySchema,
  getSelectorFormUrl
} from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';
import { environment } from '@env';

describe('operates', () => {
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
      { field: 'username', op: '=', value: '' }
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

});
