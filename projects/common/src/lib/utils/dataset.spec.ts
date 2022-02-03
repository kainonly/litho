import { Api, Dataset } from '@weplanx/common';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { nav } from '../mock';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
class ExampleService extends Api<any> {
  protected override model = 'example';
}

describe('测试数据源', () => {
  let httpTestingController: HttpTestingController;
  let service: ExampleService;
  let ds: Dataset<any> = new Dataset<any>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExampleService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ExampleService);
  });

  it('从请求资源设置数据', done => {
    ds.from(service, true).subscribe(data => {
      expect(ds.values).toEqual(nav);
      expect(ds.pageIndex).toEqual(1);
      expect(ds.pageSize).toEqual(10);
      expect(data).toEqual(nav);
      done();
    });
    const req = httpTestingController.expectOne(`api/example`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('x-page-size')).toEqual('10');
    expect(req.request.headers.get('x-page')).toEqual('1');
    req.flush(nav, { headers: new HttpHeaders().set('x-page-total', nav.length.toString()) });
    httpTestingController.verify();
  });

  it('测试选中状态', () => {
    ds.setData(nav);
    ds.setNChecked(true);
    expect(ds.values.map(v => v._id)).toEqual([...ds.checkedIds.values()]);
    expect(ds.checkedNumber).toEqual(nav.length);
    expect(ds.indeterminate).toBeFalsy();
    expect(ds.checked).toBeTruthy();
    ds.setNChecked(false);
    expect(ds.checkedIds.size).toEqual(0);
    expect(ds.checkedNumber).toEqual(0);
    expect(ds.indeterminate).toBeFalsy();
    expect(ds.checked).toBeFalse();
    ds.setChecked('61ca6ada2e83bf89116a4799', true);
    expect(ds.checkedIds.has('61ca6ada2e83bf89116a4799')).toBeTruthy();
    expect(ds.checkedIds.size).toEqual(1);
    expect(ds.checkedNumber).toEqual(1);
    expect(ds.indeterminate).toBeTruthy();
    expect(ds.checked).toBeFalsy();
    ds.clearChecked();
    expect(ds.checkedIds.size).toEqual(0);
    expect(ds.checkedNumber).toEqual(0);
    expect(ds.indeterminate).toBeFalsy();
    expect(ds.checked).toBeFalsy();
  });
});
