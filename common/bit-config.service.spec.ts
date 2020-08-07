import { TestBed } from '@angular/core/testing';
import { environment } from '@env';
import { BitConfigService, NgxBitModule } from 'ngx-bit';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

describe('BitConfigService', () => {
  let service: BitConfigService;

  beforeEach(() => {
    if (!service) {
      TestBed.configureTestingModule({
        imports: [
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      service = TestBed.inject(BitConfigService);
    }
  });

  it('Verify configuration correctness', () => {
    expect(service.url).toBe(environment.bit.url);
    expect(service.api).toBe(environment.bit.api);
    expect(service.locale).toBe(environment.bit.locale);
    expect(service.page).toBe(environment.bit.page);
    expect(service.col).toBe(environment.bit.col);
    expect(service.i18n).toBe(environment.bit.i18n);
  });

  it('Test setup common language pack', (done) => {
    service.setupLocales(import('../simulation/language'));
    setTimeout(() => {
      const lang = service.getLang('zh_cn');
      expect(lang).not.toBeNull();
      expect(lang.dashboard).toBe('仪表盘');
      done();
    }, 1000);
  });

  it('Test set up request interceptor', (done) => {
    const http = of({
      error: 1,
      code: 400
    });
    service.setupHttpInterceptor(
      map((res: any) => {
        if (res.error === 1 && res.code === 400) {
          return false;
        }
        return res;
      })
    );
    http.pipe(
      service.getHttpInterceptor()
    ).subscribe(result => {
      expect(result).toBe(false);
      done();
    });
  });
});
