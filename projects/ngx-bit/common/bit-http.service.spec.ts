import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { BitConfig, BitHttpService, BitModule, BitService } from 'ngx-bit';
import { environment } from '@mock/env';
import { map } from 'rxjs/operators';

describe('BitHttpService', () => {
  let config: BitConfig;
  let bit: BitService;
  let http: BitHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]), BitModule.forRoot(environment.bit)]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    config = TestBed.inject(BitConfig);
    bit = TestBed.inject(BitService);
    http = TestBed.inject(BitHttpService);
  });

  it('Test sending a login request', () => {
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

  it('Test set up request interceptor', () => {
    http.setupInterceptor(
      map(res => {
        if (res.error) {
          return 'block';
        }
        return res;
      })
    );
    const result = {
      error: 1,
      msg: 'failed'
    };
    const data = {
      username: 'kain',
      password: 'pass@VAN1234'
    };
    http.req('main/login', data).subscribe(res => {
      expect(res).toEqual('block');
    });
    const req = httpTestingController.expectOne(config.url.api + '/system/main/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush(result);
    httpTestingController.verify();
  });
});
