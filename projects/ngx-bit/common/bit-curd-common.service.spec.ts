import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { BitConfig, BitHttpService, BitModule, BitService } from 'ngx-bit';
import { environment } from '@mock/env';
import { ExampleService } from '@mock/example.service';

describe('BitCurdCommonService', () => {
  let config: BitConfig;
  let bit: BitService;
  let http: BitHttpService;
  let httpTestingController: HttpTestingController;
  let exampleService: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        BitModule.forRoot(environment.bit)
      ],
      providers: [
        ExampleService
      ]
    });
    config = TestBed.inject(BitConfig);
    bit = TestBed.inject(BitService);
    http = TestBed.inject(BitHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
    exampleService = TestBed.inject(ExampleService);
  });

  it('Test list data request', () => {
    const result = {
      error: 0,
      data: [
        { id: 1, username: 'kain' }
      ]
    };
    exampleService.originLists(100).subscribe(data => {
      expect(data).toEqual(result.data);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/originLists');
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
    exampleService.get(1).subscribe(data => {
      expect(data).toEqual(result.data);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/get');
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
    exampleService.getFromUsername('kain').subscribe(data => {
      expect(data).toEqual(result.data);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/get');
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
    exampleService.lists(search, true, true).subscribe(data => {
      expect(data).toEqual(result.data.lists);
      done();
    });
    setTimeout(() => {
      const req = httpTestingController.expectOne(config.url.api + '/system/example/lists');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body.page).toEqual({
        limit: 10,
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
    exampleService.add({
      username: 'kain',
      age: 26,
      sex: 1,
      call: 'devbot',
      email: 'zhangtqx@vip.qq.com'
    }).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/add');
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
    exampleService.edit(data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/edit');
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
    exampleService.editFormUsername('kain', data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/edit');
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
    exampleService.status(data).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/edit');
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
    exampleService.work(data, 'no0').subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/edit');
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
    exampleService.delete([1, 2]).subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/delete');
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
    exampleService.deleteFormUsername('kain').subscribe(res => {
      expect(res).toEqual(result);
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/example/delete');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.where[0]).toEqual(['username', '=', 'kain']);
    req.flush(result);
    httpTestingController.verify();
  });

  it('Test delete data request prevent', () => {
    exampleService.deleteNothing().subscribe(res => {
      expect(res).toBeFalsy();
    });
  });
});
