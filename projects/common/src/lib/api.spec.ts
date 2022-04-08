import {
  AnyDto,
  ApiOptions,
  Data,
  Filter,
  FilterOption,
  FindOneByIdOption,
  FindOneOption,
  FindOption,
  httpOptions,
  Page,
  R,
  UpdateOneByIdOption,
  UpdateOption
} from '@weplanx/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { pages, TestPagesService } from './mock';
import { HttpHeaders } from '@angular/common/http';

describe('测试请求', () => {
  let httpTestingController: HttpTestingController;
  let service: TestPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestPagesService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TestPagesService);
  });

  it('创建文档', () => {
    const doc: Page = {
      parent: '',
      name: '商品管理',
      icon: 'shopping',
      kind: 'group',
      sort: 0,
      status: true
    };
    service
      .create(doc, {
        format_doc: {
          parent: 'oid'
        }
      })
      .subscribe(() => {});
    const req = httpTestingController.expectOne('api/pages');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('wpx-action')).toEqual('create');
    expect(req.request.headers.getAll('wpx-format-doc')).toEqual(['parent:oid']);
    expect(req.request.body).toEqual(doc);
    req.flush({});
    httpTestingController.verify();
  });

  it('批量创建文档', () => {
    const docs: Page[] = [
      {
        parent: '',
        name: '商品管理',
        icon: 'shopping',
        kind: 'group',
        sort: 0,
        status: true
      }
    ];
    service
      .bulkCreate(docs, {
        format_doc: {
          parent: 'oid'
        }
      })
      .subscribe(() => {});
    const req = httpTestingController.expectOne('api/pages');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('wpx-action')).toEqual('bulk-create');
    expect(req.request.headers.getAll('wpx-format-doc')).toEqual(['parent:oid']);
    expect(req.request.body).toEqual(docs);
    req.flush({});
    httpTestingController.verify();
  });

  it('获取文档总数', done => {
    const filter: Filter<Page> = {
      parent: '61ca6ada2e83bf89116a4799'
    };
    const option: FilterOption<Page> = {
      format_filter: {
        parent: 'oid'
      }
    };
    service.count(filter, option).subscribe(v => {
      expect(v).toEqual(100);
      done();
    });
    const { params } = httpOptions<Page>(option, filter);
    const req = httpTestingController.expectOne(`api/pages/_count?${params.toString()}`);
    expect(req.request.method).toEqual('HEAD');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['parent:oid']);
    expect(req.request.params.get('filter')).toEqual(JSON.stringify(filter));

    const headers = new HttpHeaders().set('wpx-total', '100');
    req.flush(null, { headers });
    httpTestingController.verify();
  });

  it('获取文档存在状态', done => {
    const filter: Filter<Page> = {
      _id: '61ca6ada2e83bf89116a4799'
    };
    const option: FilterOption<Page> = {
      format_filter: {
        _id: 'oid'
      }
    };
    service.exists(filter, option).subscribe(v => {
      expect(v).toBeTruthy();
      done();
    });
    const { params } = httpOptions<Page>(option, filter);
    const req = httpTestingController.expectOne(`api/pages/_exists?${params.toString()}`);
    expect(req.request.method).toEqual('HEAD');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['_id:oid']);
    expect(req.request.params.get('filter')).toEqual(JSON.stringify(filter));
    const headers = new HttpHeaders().set('wpx-exists', 'true');
    req.flush(null, { headers });
    httpTestingController.verify();
  });

  it('通过筛选获取单个匹配文档', () => {
    const filter: Filter<Page> = {
      parent: '61ca6ada2e83bf89116a4799'
    };
    const option: FindOneOption<Page> = {
      field: ['_id', 'parent', 'name'],
      format_filter: {
        parent: 'oid'
      }
    };
    service.findOne(filter, option).subscribe(() => {});
    const { params } = httpOptions<Page>(option, filter);
    const req = httpTestingController.expectOne(`api/pages?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('wpx-type')).toEqual('find-one');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['parent:oid']);
    expect(req.request.params.get('filter')).toEqual(JSON.stringify(filter));
    expect(req.request.params.getAll('field')).toEqual(['_id', 'parent', 'name']);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过 ObjectId 获取文档', () => {
    const id = '61ca6ada2e83bf89116a479e';
    const option: FindOneByIdOption<Page> = {
      field: ['_id', 'parent', 'name']
    };
    service.findOneById(id, option).subscribe(() => {});
    const { params } = httpOptions<Page>(option);
    const req = httpTestingController.expectOne(`api/pages/${id}?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.getAll('field')).toEqual(['_id', 'parent', 'name']);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过筛选获取匹配文档', () => {
    const filter: Filter<Page> = {
      _id: {
        $in: [
          '61ca6ada2e83bf89116a4799',
          '61ca6ada2e83bf89116a479c',
          '61ca6ada2e83bf89116a479d',
          '61ca6ada2e83bf89116a479a'
        ]
      }
    };
    const option: FindOption<Page> = {
      field: ['_id', 'parent', 'name'],
      sort: { sort: 1 },
      limit: 100,
      skip: 200,
      format_filter: {
        '_id.$in': 'oids'
      }
    };
    service.find(filter, option).subscribe(() => {});
    const { params } = httpOptions<Page>(option, filter);
    const req = httpTestingController.expectOne(`api/pages?${params.toString()}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('wpx-limit')).toEqual('100');
    expect(req.request.headers.get('wpx-skip')).toEqual('200');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['_id.$in:oids']);
    expect(req.request.params.get('filter')).toEqual(JSON.stringify(filter));
    expect(req.request.params.getAll('field')).toEqual(['_id', 'parent', 'name']);
    expect(req.request.params.getAll('sort')).toEqual(['sort.1']);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过数据源获取分页文档', done => {
    const values = [...pages.slice(0, 5)];
    const data: Data<AnyDto<Page>> = new Data();
    data.filter = {
      parent: '61ca6ada2e83bf89116a4799'
    };
    data.field = ['_id', 'parent', 'name'];
    data.sort = { sort: 1 };
    data.format_filter = {
      parent: 'oid'
    };
    data.size = 5;
    service.findByPage(data).subscribe(v => {
      expect(v.length).toEqual(5);
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
    req.flush(values, { headers });
    httpTestingController.verify();
  });

  it('通过筛选局部更新匹配文档', () => {
    const filter: Filter<Page> = {
      _id: {
        $in: [
          '61ca6ada2e83bf89116a4799',
          '61ca6ada2e83bf89116a479c',
          '61ca6ada2e83bf89116a479d',
          '61ca6ada2e83bf89116a479a'
        ]
      }
    };
    const update: R = {
      $set: {
        parent: '624a8f91b4e5d150793d6352'
      }
    };
    const option: UpdateOption<Page> = {
      format_filter: {
        '_id.$in': 'oids'
      },
      format_doc: {
        parent: 'oid'
      }
    };
    service.update(filter, update, option).subscribe(() => {});
    const { params } = httpOptions<Page>(option, filter);
    const req = httpTestingController.expectOne(`api/pages?${params.toString()}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['_id.$in:oids']);
    expect(req.request.headers.getAll('wpx-format-doc')).toEqual(['parent:oid']);
    expect(req.request.params.get('filter')).toEqual(JSON.stringify(filter));
    expect(req.request.body).toEqual(update);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过 ObjectId 局部更新文档', () => {
    const id = '61ca6ada2e83bf89116a479e';
    const update: R = {
      $set: {
        parent: '624a8f91b4e5d150793d6352'
      }
    };
    const option: UpdateOneByIdOption<Page> = {
      format_doc: {
        parent: 'oid'
      }
    };
    service.updateOneById(id, update, option).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/pages/${id}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.headers.getAll('wpx-format-doc')).toEqual(['parent:oid']);
    expect(req.request.body).toEqual(update);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过 ObjectId 完整更新文档', () => {
    const id = '61ca6ada2e83bf89116a479e';
    const doc: Page = {
      parent: '624a8f91b4e5d150793d6352',
      name: '商品管理',
      icon: 'shopping',
      kind: 'group',
      sort: 0,
      status: true
    };
    const option: UpdateOneByIdOption<Page> = {
      format_doc: {
        parent: 'oid'
      }
    };
    service.replace(id, doc, option).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/pages/${id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.getAll('wpx-format-doc')).toEqual(['parent:oid']);
    expect(req.request.body).toEqual(doc);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过筛选删除匹配文档', () => {
    const filter: Filter<Page> = {
      _id: {
        $in: [
          '61ca6ada2e83bf89116a4799',
          '61ca6ada2e83bf89116a479c',
          '61ca6ada2e83bf89116a479d',
          '61ca6ada2e83bf89116a479a'
        ]
      }
    };
    const option: FilterOption<Page> = {
      format_filter: {
        '_id.$in': 'oids'
      }
    };
    service.bulkDelete(filter, option).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/pages`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('wpx-action')).toEqual('bulk-delete');
    expect(req.request.headers.getAll('wpx-format-filter')).toEqual(['_id.$in:oids']);
    expect(req.request.body).toEqual(filter);
    req.flush({});
    httpTestingController.verify();
  });

  it('通过 ObjectId 删除文档', () => {
    const id = '61ca6ada2e83bf89116a479e';
    service.delete(id).subscribe(() => {});
    const req = httpTestingController.expectOne(`api/pages/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
    httpTestingController.verify();
  });
});
