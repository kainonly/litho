import { AnyDto, Api, Data, httpOptions, Page } from '@weplanx/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { pages, TestPagesService } from './mock';
import { HttpHeaders } from '@angular/common/http';

describe('测试数据源', () => {
  let httpTestingController: HttpTestingController;
  let service: TestPagesService;
  let data: Data<AnyDto<Page>> = new Data<AnyDto<Page>>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestPagesService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TestPagesService);
  });

  it('从请求资源设置数据', done => {
    data.filter = {
      parent: '61ca6ada2e83bf89116a4799'
    };
    data.field = ['_id', 'parent', 'name'];
    data.sort = { sort: 1 };
    data.format_filter = {
      parent: 'oid'
    };
    data.size = 5;
    data.from(service, true).subscribe(v => {
      expect(v.length).toEqual(5);
      expect(data.index).toEqual(1);
      expect(data.total).toEqual(pages.length);
      done();
    });
    const { params } = httpOptions<Page>(
      {
        field: data.field,
        sort: data.sort,
        format_filter: data.format_filter
      },
      data.filter
    );
    const req = httpTestingController.expectOne(`api/pages?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('wpx-type')).toEqual('find-by-page');
    expect(req.request.headers.get('wpx-page')).toEqual('1');
    expect(req.request.headers.get('wpx-page-size')).toEqual('5');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['parent:oid']);
    expect(req.request.params.get('filter')).toEqual(JSON.stringify(data.filter));
    expect(req.request.params.getAll('field')).toEqual(['_id', 'parent', 'name']);
    expect(req.request.params.getAll('sort')).toEqual(['sort.1']);

    const headers = new HttpHeaders().set('wpx-total', pages.length.toString());
    req.flush(pages.slice(0, 5), { headers });
    httpTestingController.verify();
  });

  it('测试选中状态', () => {
    data.set(pages);
    data.setNChecked(true);
    expect(data.values.map(v => v._id)).toEqual([...data.checkedIds.values()]);
    expect(data.checkedNumber).toEqual(pages.length);
    expect(data.indeterminate).toBeFalsy();
    expect(data.checked).toBeTruthy();
    data.setNChecked(false);
    expect(data.checkedIds.size).toEqual(0);
    expect(data.checkedNumber).toEqual(0);
    expect(data.indeterminate).toBeFalsy();
    expect(data.checked).toBeFalse();
    data.setChecked('61ca6ada2e83bf89116a4799', true);
    expect(data.checkedIds.has('61ca6ada2e83bf89116a4799')).toBeTruthy();
    expect(data.checkedIds.size).toEqual(1);
    expect(data.checkedNumber).toEqual(1);
    expect(data.indeterminate).toBeTruthy();
    expect(data.checked).toBeFalsy();
    data.clearChecked();
    expect(data.checkedIds.size).toEqual(0);
    expect(data.checkedNumber).toEqual(0);
    expect(data.indeterminate).toBeFalsy();
    expect(data.checked).toBeFalsy();
  });
});
