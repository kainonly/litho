import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { BitConfigService, BitHttpService, BitService, NgxBitModule } from 'ngx-bit';
import { environment } from '../simulation/environment';
import { TestService } from '../simulation/test.service';
import { map } from 'rxjs/operators';

describe('BitHttpService', () => {
  let http: BitHttpService;
  let httpTestingController: HttpTestingController;
  let curd: TestService;
  let config: BitConfigService;
  let bit: BitService;

  beforeEach(() => {
    if (!http) {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
          NgxBitModule.forRoot(environment.bit)
        ],
        providers: [
          TestService
        ]
      });
      http = TestBed.inject(BitHttpService);
      httpTestingController = TestBed.inject(HttpTestingController);
      curd = TestBed.inject(TestService);
      config = TestBed.inject(BitConfigService);
      bit = TestBed.inject(BitService);
    }
  });

  it('Test sending a login request', () => {
    config.setupHttpInterceptor(map(res => {
      return res;
    }));
    const result = {
      error: 0,
      msg: 'ok'
    };
    const data = {
      username: 'kain',
      password: 'pass@VAN1234'
    };
    http.req('main/login', data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/main/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test list data request', () => {
    const result = {
      error: 0,
      data: [
        { id: 1, username: 'kain' }
      ]
    };
    curd.originLists(100).subscribe(data => {
      expect(data).toEqual(result.data);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/originLists');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.where[0]).toEqual(['type', '=', 100]);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test get data request', () => {
    const result = {
      error: 0,
      data: {
        id: 1,
        username: 'kain'
      }
    };
    curd.get(1).subscribe(data => {
      expect(data).toEqual(result.data);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/get');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.id).toEqual(1);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test get data request by query', () => {
    const result = {
      error: 0,
      data: {
        id: 1,
        username: 'kain'
      }
    };
    curd.getFromUsername('kain').subscribe(data => {
      expect(data).toEqual(result.data);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/get');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.where[0]).toEqual(['username', '=', 'kain']);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test paged list data request', (done) => {
    const result = {
      error: 0,
      data: {
        total: 1,
        lists: [
          { id: 1, username: 'kain' }
        ]
      }
    };
    const search = bit.listByPage({
      id: 'test',
      query: [
        { field: 'sex', op: '=', value: 1 }
      ]
    });
    curd.lists(search, true, true).subscribe(data => {
      expect(data).toEqual(result.data.lists);
      done();
    });
    setTimeout(() => {
      const req = httpTestingController.expectOne(config.url.api + '/system/test/lists');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body.page).toEqual({
        limit: 20,
        index: 1
      });
      expect(req.request.body.where[0]).toEqual(['sex', '=', 1]);
      req.flush(result);
      httpTestingController.verify();
    }, 200);
  });

  it('Test add data request', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    const data = {
      username: 'kain',
      age: 26,
      sex: 1,
      call: 'devbot',
      email: 'zhangtqx@vip.qq.com'
    };
    curd.add({
      username: 'kain',
      age: 26,
      sex: 1,
      call: 'devbot',
      email: 'zhangtqx@vip.qq.com'
    }).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/add');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test modify data request', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    const data = {
      id: 1,
      call: 'mydevbot'
    };
    curd.edit(data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/edit');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test modify data request by query', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    const data = {
      call: 'mydevbot'
    };
    curd.editFormUsername('kain', data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/edit');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.call).toEqual(data.call);
    expect(req.request.body.where[0]).toEqual(['username', '=', 'kain']);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test data status change request', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    const data = {
      id: 1,
      status: 0
    };
    curd.status(data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/edit');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      id: 1,
      status: true,
      switch: true
    });
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test the custom status change request', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    const data = {
      id: 1,
      work: 1
    };
    curd.work(data, 'no0').subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/edit');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      id: 1,
      work: false,
      switch: true,
      key: 'no0'
    });
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test delete data request', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    curd.delete([1, 2]).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/delete');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      id: [1, 2]
    });
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test delete data request by query', () => {
    const result = {
      error: 0,
      msg: 'ok'
    };
    curd.deleteFormUsername('kain').subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/test/delete');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.where[0]).toEqual(['username', '=', 'kain']);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test delete data request prevent', () => {
    curd.deleteNothing().subscribe(res => {
      expect(res).toBeFalsy();
    });
  });
});
