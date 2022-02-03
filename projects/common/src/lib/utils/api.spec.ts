import { Api, CreateDto, Dataset, ReplaceDto, toSortValues, UpdateDto, Where } from '@weplanx/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { nav } from '../mock';

@Injectable()
class ExampleService extends Api<any> {
  protected override model = 'example';
}

describe('测试请求', () => {
  let httpTestingController: HttpTestingController;
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExampleService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ExampleService);
  });

  it('创建文档', () => {
    const body: CreateDto<any> = {
      doc: {
        name: '测试'
      }
    };
    service.create(body).subscribe(() => {});
    const req = httpTestingController.expectOne('api/example');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(body);
    req.flush({});
    httpTestingController.verify();
  });

  it('获取单个文档（筛选）', () => {
    expect(() => service.findOne({})).toThrowError('筛选条件不能为空');
    const where: Where<any> = {
      name: '测试'
    };
    service.findOne(where).subscribe(() => {});
    const params = new HttpParams().set('where', JSON.stringify(where)).set('single', 'true');
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params).toEqual(params);
    req.flush({});
    httpTestingController.verify();
  });

  it('获取单个文档（ID）', () => {
    expect(() => service.findOneById('')).toThrowError('文档 ID 不能为空');
    const id = '61ca6ada2e83bf89116a479e';
    service.findOneById(id).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/example/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpTestingController.verify();
  });

  it('获取多个文档（筛选）', () => {
    const where: Where<any> = {
      name: '测试'
    };
    const sort: Record<string, 1 | -1> = {
      sort: 1
    };
    service.find(where, sort).subscribe(() => {});
    let params = new HttpParams().set('where', JSON.stringify(where));
    for (const v of toSortValues(sort)) {
      params = params.append('sort', v);
    }
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params).toEqual(params);
    req.flush({});
    httpTestingController.verify();
  });

  it('获取多个文档（ID集合）', () => {
    expect(() => service.findById([])).toThrowError('文档 ID 数组不能为空');
    const ids = ['61ca6ada2e83bf89116a479e', '61ca6ada2e83bf89116a479f'];
    const sort: Record<string, 1 | -1> = {
      sort: 1
    };
    service.findById(ids, sort).subscribe(() => {});
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('id', id);
    }
    for (const v of toSortValues(sort)) {
      params = params.append('sort', v);
    }
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params).toEqual(params);
    req.flush({});
    httpTestingController.verify();
  });

  it('获取分页文档', done => {
    const ds = new Dataset();
    ds.where = {
      name: '测试'
    };
    ds.sort = {
      sort: 'ascend'
    };
    service.findByPage(ds).subscribe(data => {
      expect(data).toEqual(nav);
      expect(ds.total).toEqual(nav.length);
      done();
    });
    let params = new HttpParams();
    if (Object.keys(ds.where).length !== 0) {
      params = params.set('where', JSON.stringify(ds.where));
    }
    if (Object.keys(ds.sort).length !== 0) {
      for (const v of toSortValues(ds.sort)) {
        params = params.append('sort', v);
      }
    }
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params).toEqual(params);
    expect(req.request.headers.get('x-page-size')).toEqual('10');
    expect(req.request.headers.get('x-page')).toEqual('1');
    req.flush(nav, { headers: new HttpHeaders().set('x-page-total', nav.length.toString()) });
    httpTestingController.verify();
  });

  it('更新多个文档（筛选）', () => {
    const body: UpdateDto<any> = {
      update: {
        $set: {
          name: '更新测试'
        }
      }
    };
    expect(() => service.update({}, body)).toThrowError('筛选条件不能为空');
    const where: Where<any> = {
      name: '测试'
    };
    service.update(where, body).subscribe(() => {});
    let params = new HttpParams().set('where', JSON.stringify(where)).set('single', 'false');
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.params).toEqual(params);
    expect(req.request.body).toEqual(body);
    req.flush({});
    httpTestingController.verify();
  });

  it('更新多个文档（ID）', () => {
    const body: UpdateDto<any> = {
      update: {
        $set: {
          name: '更新测试'
        }
      }
    };
    expect(() => service.updateById([], body)).toThrowError('文档 ID 数组不能为空');
    const ids = ['61ca6ada2e83bf89116a479e', '61ca6ada2e83bf89116a479f'];
    service.updateById(ids, body).subscribe(() => {});
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('id', id);
    }
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.params).toEqual(params);
    expect(req.request.body).toEqual(body);
    req.flush({});
    httpTestingController.verify();
  });

  it('更新单个文档（筛选）', () => {
    const body: UpdateDto<any> = {
      update: {
        $set: {
          name: '更新测试'
        }
      }
    };
    const where: Where<any> = {
      name: '测试'
    };
    service.updateOne(where, body).subscribe(() => {});
    let params = new HttpParams().set('where', JSON.stringify(where)).set('single', 'true');
    const req = httpTestingController.expectOne(`api/example?${params.toString()}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.params).toEqual(params);
    expect(req.request.body).toEqual(body);
    req.flush({});
    httpTestingController.verify();
  });

  it('更新单个文档（ID）', () => {
    const body: UpdateDto<any> = {
      update: {
        $set: {
          name: '更新测试'
        }
      }
    };
    expect(() => service.updateOneById('', body)).toThrowError('文档 ID 不能为空');
    const id = '61ca6ada2e83bf89116a479e';
    service.updateOneById(id, body).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/example/${id}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush({});
    httpTestingController.verify();
  });

  it('替换单个文档', () => {
    const body: ReplaceDto<any> = {
      doc: {
        name: '替换测试',
        sort: 0
      }
    };
    expect(() => service.replace('', body)).toThrowError('文档 ID 不能为空');
    const id = '61ca6ada2e83bf89116a479e';
    service.replace(id, body).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/example/${id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(body);
    req.flush({});
    httpTestingController.verify();
  });

  it('删除文档', () => {
    expect(() => service.delete('')).toThrowError('文档 ID 不能为空');
    const id = '61ca6ada2e83bf89116a479e';
    service.delete(id).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/example/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
    httpTestingController.verify();
  });
});
