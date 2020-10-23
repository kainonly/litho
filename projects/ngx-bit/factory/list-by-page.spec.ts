import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ListByPage } from 'ngx-bit/factory';
import { switchMap } from 'rxjs/operators';

describe('ListByPage', () => {
  let lists: ListByPage;
  let storage: StorageMap;

  beforeEach((done) => {
    if (!lists) {
      storage = TestBed.inject(StorageMap);
      lists = new ListByPage(
        {
          id: 'test',
          limit: 10,
          query: [
            { field: 'username', op: '=', value: '' }
          ]
        },
        storage
      );
      setTimeout(() => {
        // wait init
        done();
      }, 200);
    } else {
      done();
    }
  });

  it('Test setData', (done) => {
    // @ts-ignore
    import('../mock/acl.json').then((res: any) => {
      lists.setData(res.data.lists);
      expect(lists.data).toEqual(res.data.lists);
      done();
    });
  });

  it('Test hasSearch', () => {
    expect(lists.hasSearch('username')).toBeTruthy();
  });

  it('Test afterSearch', (done) => {
    lists.search.username.value = 'kain';
    lists.afterSearch().pipe(
      switchMap(() => storage.has('search:test')),
      switchMap(status => {
        expect(status).toBeTruthy();
        return storage.get('search:test');
      })
    ).subscribe(value => {
      expect(value).toEqual({
        username: {
          field: 'username',
          op: '=',
          value: 'kain'
        }
      });
      done();
    });
  });

  it('Test clearSearch', (done) => {
    lists.clearSearch({}).pipe(
      switchMap(() => storage.has('search:test')),
      switchMap((status) => {
        expect(status).toBeFalsy();
        expect(lists.search.username.value).toEqual('');
        return lists.clearSearch({
          username: 'kain'
        });
      }),
      switchMap(() => {
        expect(lists.search.username.value).toEqual('kain');
        return lists.clearSearch();
      })
    ).subscribe(() => {
      done();
    });
  });

  it('Test checked status', () => {
    lists.checkedAll(true);
    expect(lists.checked).toBeTruthy();
    expect(lists.indeterminate).toBeFalsy();
    expect(lists.batch).toBeTruthy();
    expect(lists.checkedNumber).toEqual(lists.data.length);
    lists.data[0].checked = false;
    lists.refreshStatus();
    expect(lists.checked).toBeFalsy();
    expect(lists.indeterminate).toBeTruthy();
    expect(lists.batch).toBeTruthy();
    expect(lists.checkedNumber).toEqual(lists.data.length - 1);
    const checkedLists = lists.getChecked();
    expect(checkedLists.length).toEqual(lists.data.length - 1);
    expect(checkedLists.some(v => v.id === lists.data[0].id)).toBeFalsy();
    lists.checkedAll(false);
    expect(lists.checked).toBeFalsy();
    expect(lists.indeterminate).toBeFalsy();
    expect(lists.batch).toBeFalsy();
    expect(lists.checkedNumber).toEqual(0);
  });

  it('Test lists page', (done) => {
    lists.index = 2;
    lists.persistence();
    setTimeout(() => {
      lists.getPage().subscribe(value => {
        expect(value).toEqual(2);
        done();
      });
    }, 200);
  });

  it('Test convert to query schema', (done) => {
    let schema = lists.toQuerySchema();
    expect(schema).toEqual([]);
    lists.search.username.value = 'kain';
    lists.afterSearch().subscribe(() => {
      schema = lists.toQuerySchema();
      expect(schema).toEqual([['username', '=', 'kain']]);
      done();
    });
  });
});
