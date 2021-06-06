import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { BitModule, BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit';
import { of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { environment } from '@mock/env';
import { routes } from '@mock/routes';
import { ExampleModule } from '@mock/example.module';
import { StorageMap } from '@ngx-pwa/local-storage';

describe('BitService', () => {
  let bit: BitService;
  let router: Router;
  let location: Location;
  let storage: StorageMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        BitModule.forRoot(environment.bit),
        ExampleModule
      ]
    });
    bit = TestBed.inject(BitService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    storage = TestBed.inject(StorageMap);
    localStorage.clear();
    bit.setupLocale();
    bit.registerLocales(import('@mock/common.language'));
  });

  it('Test open routerlink with cross level', (done) => {
    router.navigate(['/']);
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(1)
    ).subscribe((e: RouterEvent) => {
      expect(e.url).toBe('/example-add');
      done();
    });
    bit.open(['example-add']);
  });

  it('Test open use cross level without storage', (done) => {
    router.navigate(['/']);
    let count = 2;
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(count)
    ).subscribe((e: RouterEvent) => {
      switch (2 - count) {
        case 0:
          expect(e.url).toBe('/example-add');
          bit.history('example-index');
          break;
        case 1:
          expect(e.url).toBe('/example-index');
          break;
      }
      count--;
      if (!count) {
        done();
      }
    });
    bit.open(['example-add']);
  });

  it('Test open use cross level', (done) => {
    router.navigate(['/']);
    let count = 3;
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(count)
    ).subscribe((e: RouterEvent) => {
      switch (3 - count) {
        case 0:
          expect(e.url).toBe('/example-edit/123');
          bit.open(['example-opt', '123', 'A1']);
          break;
        case 1:
          expect(e.url).toBe('/example-opt/123/A1');
          bit.history('example-edit');
          break;
        case 2:
          expect(e.url).toBe('/example-edit/123');
          break;
      }
      count--;
      if (!count) {
        done();
      }
    });
    bit.open(['example-edit', '123']);
  });

  it('Test location back', (done) => {
    router.navigate(['/']);
    let count = 2;
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(count)
    ).subscribe((e: RouterEvent) => {
      switch (2 - count) {
        case 0:
          expect(e.url).toBe('/example-index');
          bit.open(['example-add']);
          break;
        case 1:
          expect(e.url).toBe('/example-add');
          bit.back();
          break;
      }
      count--;
    });
    location.subscribe(e => {
      setTimeout(() => {
        expect(e.url).toBe('/example-index');
        done();
      }, 200);
    });
    bit.open(['example-index']);
  });

  it('Test registered language pack', (done) => {
    bit.registerLocales(import('@mock/language'));
    setTimeout(() => {
      expect(bit.l.dashboard).toBe('仪表盘');
      expect(bit.l.name).toBe('测试');
      done();
    }, 200);
  });

  it('Test set language pack ID', (done) => {
    bit.registerLocales(import('@mock/language'));
    bit.localeChanged.subscribe((locale) => {
      console.log(bit.l);
      expect(bit.l.dashboard).toBe('Dashboard');
      expect(bit.l.name).toBe('TEST');
      done();
    });
    setTimeout(() => {
      bit.setLocale('en_us');
    }, 200);
  });

  it('Test i18n ID', () => {
    expect(bit.equalI18n('zh_cn')).toBeTruthy();
    bit.i18n = 'en_us';
    bit.resetI18n();
    expect(bit.equalI18n('zh_cn')).toBeTruthy();
  });

  it('Test init i18n form group', () => {
    try {
      const fun1 = () => {
        return of(null);
      };
      const name = bit.i18nGroup({
        value: {
          zh_cn: '测试',
          en_us: 'TEST'
        },
        validate: {
          zh_cn: [Validators.required],
          en_us: []
        },
        asyncValidate: {
          en_us: [fun1]
        }
      });
      expect(name.zh_cn[0]).toEqual('测试');
      expect(name.en_us[0]).toEqual('TEST');
      expect(name.zh_cn[1]).toEqual([Validators.required]);
      expect(name.en_us[1]).toEqual([]);
      expect(name.zh_cn[2]).toEqual([]);
      expect(name.en_us[2]).toEqual([fun1]);
    } catch (e) {
      fail(e);
    }
  });

  it('Test parse i18n string json', () => {
    const data = bit.i18nParse('{"zh_cn":"测试","en_us":"TEST","ja_jp":"テスト"}');
    expect(data.zh_cn).toBe('测试');
    expect(data.en_us).toBe('TEST');
    expect(data.ja_jp).toBeUndefined();
  });

  it('Test factory list by page', () => {
    expect(bit.listByPage({
      id: 'test',
      query: []
    })).toBeInstanceOf(ListByPage);
  });

  it('Test clear', () => {
    bit.clear();
    expect().nothing();
  });
});
