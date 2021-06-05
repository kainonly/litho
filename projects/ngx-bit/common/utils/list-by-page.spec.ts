import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitCurdService, BitModule, ListByPage } from 'ngx-bit';
import { delay, switchMap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../simulation/environment';
import { dataset } from './mock';

describe('ListByPage', () => {
  let curd: BitCurdService;
  let storage: StorageMap;
  let lists: ListByPage;
  const searchData = {
    username: {
      field: 'username',
      op: '=',
      value: 'kain'
    },
    keywords: {
      field: 'keywords',
      op: 'like',
      value: 'ab'
    }
  };

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BitModule.forRoot(environment.bit)
      ]
    });
    curd = TestBed.inject(BitCurdService);
    storage = TestBed.inject(StorageMap);
    storage.clear().pipe(
      switchMap(() => {
        lists = new ListByPage(
          curd,
          storage,
          {
            id: 'test',
            limit: 10,
            query: [
              { field: 'username', op: '=', value: '' },
              { field: 'keywords', op: 'like', value: 'ab' }
            ]
          }
        );
        return lists.ready;
      })
    ).subscribe(() => {
      lists.setData(dataset);
      done();
    });
  });

  it('Test getQuerySchema', () => {
    let schema = curd.getQuerySchema([
      { field: 'username', op: '=', value: '' }
    ]);
    expect(schema).toEqual([]);
    schema = curd.getQuerySchema([
      { field: 'username', op: '=', value: '', exclude: [] }
    ]);
    expect(schema).toEqual([['username', '=', '']]);
    schema = curd.getQuerySchema([
      { field: 'username', op: '=', value: 'kain' }
    ]);
    expect(schema).toEqual([['username', '=', 'kain']]);
    schema = curd.getQuerySchema([
      { field: 'username', op: '=', value: null },
      { field: 'type', op: '=', value: 0 },
      { field: 'ids', op: 'in', value: [] },
      { field: 'error', op: '=', value: {} }
    ]);
    expect(schema).toEqual([]);
    const picker = [new Date(), new Date()];
    schema = curd.getQuerySchema([
      { field: 'time', op: 'between', value: [new Date(), new Date()], format: 'unixtime' }
    ]);
    expect(schema).toEqual([
      ['time', 'between', picker.map(v => Math.floor(v.getTime() / 1000))]
    ]);
  });

  it('Check setData', () => {
    expect(lists.data).toEqual(dataset);
  });

  it('Test hasSearch', () => {
    expect(lists.hasSearch('username')).toBeTruthy();
    expect(lists.hasSearch('keywords')).toBeTruthy();
    expect(lists.hasSearch('keywords1')).toBeFalsy();
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
      expect(value).toEqual(searchData);
      done();
    });
  });

  it('Test clearSearch', (done) => {
    storage.set('search:test', searchData).pipe(
      switchMap(() => lists.clearSearch()),
      switchMap(() => storage.has('search:test')),
      switchMap((exists) => {
        expect(exists).toBeFalsy();
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

  it('Test to query', () => {
    expect(lists.toQuery()).toEqual([
      { field: 'username', op: '=', value: '' },
      { field: 'keywords', op: 'like', value: 'ab' }
    ]);
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
    lists.getPage().pipe(
      delay(200)
    ).subscribe(value => {
      expect(value).toEqual(2);
      done();
    });
  });

  it('Test convert to query schema', (done) => {
    expect(lists.toQuerySchema()).toEqual([
      ['keywords', 'like', '%ab%']
    ]);
    lists.search.username.value = 'kain';
    lists.search.keywords.value = 'cd';
    lists.afterSearch().subscribe(() => {
      expect(lists.toQuerySchema()).toEqual([
        ['username', '=', 'kain'],
        ['keywords', 'like', '%cd%']
      ]);
      done();
    });
  });
});
