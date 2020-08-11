import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { environment } from '../simulation/environment';
import { BitHttpService, BitService, NgxBitModule } from 'ngx-bit';
import { switchMap } from 'rxjs/operators';
import { TestService } from '../simulation/test.service';

// This test needs to run the project hyperf-api-case
describe('BitHttpService', () => {
  let http: BitHttpService;
  let curd: TestService;
  let bit: BitService;

  beforeEach(() => {
    if (!http) {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ],
        providers: [
          TestService
        ]
      });
      http = TestBed.inject(BitHttpService);
      curd = TestBed.inject(TestService);
      bit = TestBed.inject(BitService);
    }
  });

  it('Test sending a login request', (done) => {
    const login = http.req('main/login', {
      username: 'kain',
      password: 'pass@VAN1234'
    });
    login.subscribe(res => {
      expect(res).not.toBeNull();
      expect(res.error).toBe(0);
      done();
    });
  });

  it('Test list data request', (done) => {
    curd.originLists().subscribe(data => {
      expect(data).not.toBeNull();
      done();
    });
  });

  it('Test get data request', (done) => {
    let value: any;
    curd.originLists().pipe(
      switchMap(data => {
        expect(data).not.toBeNull();
        value = data[0];
        return curd.get(value.id);
      })
    ).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.username).toEqual(value.username);
      done();
    });
  });

  it('Test paged list data request', (done) => {
    const search = bit.listByPage({
      id: 'test',
      query: []
    });
    curd.lists(search, false, true).subscribe(data => {
      expect(data).not.toBeNull();
      done();
    });
  });

  it('Test add data request', (done) => {
    curd.add({
      username: 'kain',
      age: 26,
      sex: 1,
      call: 'devbot',
      email: 'zhangtqx@vip.qq.com'
    }).subscribe(res => {
      expect(res).not.toBeNull();
      expect(res.error).toBe(0);
      done();
    });
  });

  it('Test modify data request', (done) => {
    curd.originLists().pipe(
      switchMap(data => {
        expect(data).not.toBeNull();
        const value = data.find(v => v.username === 'kain');
        value.call = 'mydevbot';
        return curd.edit(value);
      })
    ).subscribe(res => {
      expect(res).not.toBeNull();
      expect(res.error).toBe(0);
      done();
    });
  });

  it('Test data status change request', (done) => {
    curd.originLists().pipe(
      switchMap(data => {
        expect(data).not.toBeNull();
        const value = data.find(v => v.username === 'kain');
        return curd.status({
          id: value.id,
          status: 0
        });
      })
    ).subscribe(res => {
      expect(res).not.toBeNull();
      expect(res.error).toBe(0);
      done();
    });
  });

  it('Test delete data request', (done) => {
    curd.originLists().pipe(
      switchMap(data => {
        expect(data).not.toBeNull();
        const value = data.find(v => v.username === 'kain');
        return curd.delete([value.id]);
      })
    ).subscribe(res => {
      expect(res).not.toBeNull();
      expect(res.error).toBe(0);
      done();
    });
  });
});
