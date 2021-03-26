import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';
import { AsyncSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../simulation/environment';

describe('BitService', () => {
  let config: BitConfigService;
  let bit: BitService;
  let zone: NgZone;
  let router: Router;
  let location: Location;
  let fb: FormBuilder;

  beforeEach(() => {
    if (!bit) {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterModule.forRoot([
            {
              path: '',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: 'admin-index',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: 'admin-add',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: 'admin-edit/:id',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: 'admin-edit/:id/:subId',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            }
          ])
        ],
        providers: [
          BitService,
          BitHttpService,
          BitEventsService,
          BitSupportService,
          BitSwalService,
          {
            provide: BitConfigService, useFactory: () => {
              const env = environment.bit;
              const service = new BitConfigService();
              Reflect.ownKeys(env).forEach(key => {
                service[key] = env[key];
              });
              return service;
            }
          }
        ]
      });
      config = TestBed.inject(BitConfigService);
      bit = TestBed.inject(BitService);
      zone = TestBed.inject(NgZone);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      config.setupLocales(import('../simulation/common.language'));
      fb = TestBed.inject(FormBuilder);
    }
  });

  it('Test open routerlink with cross level', (done) => {
    zone.run(() => {
      const event = router.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          expect(events.url).toBe('/admin-add');
          event.unsubscribe();
          done();
        }
      });
      bit.open(['admin-add']);
    });
  });

  it('Test open use cross level without storage', (done) => {
    zone.run(() => {
      const event = router.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          expect(events.url).toBe('/admin-index');
          event.unsubscribe();
          done();
        }
      });
      setTimeout(() => {
        bit.history('admin-index');
      }, 200);
    });
  });

  it('Test open use cross level', (done) => {
    const complete: AsyncSubject<any> = new AsyncSubject<any>();
    zone.run(() => {
      const event = complete.pipe(
        switchMap(status => {
          if (status) {
            return router.events;
          }
        })
      ).subscribe(events => {
        if (events instanceof NavigationEnd) {
          expect(events.url).toBe('/admin-edit/2');
          event.unsubscribe();
          complete.unsubscribe();
          done();
        }
      });
      bit.open(['admin-edit', 2]);
      setTimeout(() => {
        bit.open(['admin-edit', 2, 'a7']);
        setTimeout(() => {
          complete.next(true);
          complete.complete();
          bit.history('admin-edit');
        }, 200);
      }, 200);
    });
  });

  it('Test location back', (done) => {
    zone.run(() => {
      bit.open(['admin-index']);
      setTimeout(() => {
        bit.open(['admin-add']);
        setTimeout(() => {
          bit.back();
          location.subscribe(value => {
            expect(value.url).toBe('/admin-index');
            done();
          });
        }, 200);
      }, 200);
    });
  });

  it('Test registered language pack', (done) => {
    bit.registerLocales(import('../simulation/language'));
    setTimeout(() => {
      expect(bit.l.dashboard).toBe('仪表盘');
      expect(bit.l.name).toBe('测试');
      done();
    }, 200);
  });

  it('Test set language pack ID', (done) => {
    bit.setLocale('en_us');
    setTimeout(() => {
      expect(bit.l.dashboard).toBe('Dashboard');
      expect(bit.l.name).toBe('TEST');
      bit.setLocale('zh_cn');
      done();
    }, 200);
  });

  it('Test factory list by page', () => {
    const list = bit.listByPage({
      id: 'test',
      query: []
    });
    expect(list).toBeInstanceOf(ListByPage);
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
      fb.group({
        name
      });
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

});
