import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitSupportService, NgxBitModule } from 'ngx-bit';
import { BreadcrumbOption } from 'ngx-bit/types';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { environment } from '../simulation/environment';

describe('BitSupportService', () => {
  let support: BitSupportService;
  let router: Router;
  let zone: NgZone;
  let storage: StorageMap;
  let location: Location;

  beforeEach(() => {
    if (!support) {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([
            {
              path: '',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: '{admin-index}',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: '{admin-add}',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            },
            {
              path: '{admin-edit}/:id',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            }
          ], { relativeLinkResolution: 'legacy' }),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      support = TestBed.inject(BitSupportService);
      router = TestBed.inject(Router);
      zone = TestBed.inject(NgZone);
      storage = TestBed.inject(StorageMap);
      location = TestBed.inject(Location);
    }
  });

  it('Test manual set breadcrumb', () => {
    const data: BreadcrumbOption[] = [
      {
        name: {
          zh_cn: '测试1'
        },
        key: 'test2',
        router: 1
      }, {
        name: {
          zh_cn: '测试2'
        },
        key: 'test2',
        router: 1
      }
    ];
    support.setBreadcrumb(...data);
    for (const index in support.breadcrumb) {
      if (Reflect.has(support.breadcrumb, index)) {
        expect(support.breadcrumb[index].key).toBe(data[index].key);
      }
    }
  });

  it('Set resource data and setup support', (done) => {
    // @ts-ignore
    import('../mock/resource.json').then(res => {
      const resourceData: Map<string, any> = new Map<string, any>();
      const routerData: Map<string, any> = new Map<string, any>();
      const nav: any = [];

      if (!res.error) {
        for (const x of res.data) {
          resourceData.set(x.key, x);
          if (x.router === 1) {
            routerData.set(x.key, x);
          }
        }
        for (const x of res.data) {
          if (!x.nav) {
            continue;
          }

          if (x.parent === 'origin') {
            nav.push(x);
          } else {
            const parent = x.parent;
            if (resourceData.has(parent)) {
              const rows = resourceData.get(parent);
              if (!rows.hasOwnProperty('children')) {
                rows.children = [];
              }
              rows.children.push(x);
            }
          }
        }
        support.setResource(resourceData, routerData);
        expect(nav).not.toBeNull();
        support.setup(router);
        zone.run(() => {
          router.navigate(['{admin-add}']);
        });
        setTimeout(() => {
          expect(support.title.zh_cn).toBe('管理员新增');
          expect(support.breadcrumb.length).toBe(3);
          for (const value of support.breadcrumb) {
            expect(
              Reflect.has(value, 'key') &&
              Reflect.has(value, 'name') &&
              Reflect.has(value, 'router')
            ).toBeTruthy();
          }
          expect(support.breadcrumb[0].name.zh_cn).toBe('系统设置');
          expect(support.breadcrumb[0].key).toBe('system');
          expect(support.breadcrumb[0].router).toBe(0);
          expect(support.breadcrumb[1].name.zh_cn).toBe('管理员');
          expect(support.breadcrumb[1].key).toBe('admin-index');
          expect(support.breadcrumb[1].router).toBe(1);
          expect(support.breadcrumb[2].name.zh_cn).toBe('管理员新增');
          expect(support.breadcrumb[2].key).toBe('admin-add');
          expect(support.breadcrumb[2].router).toBe(1);
          expect(support.navActive).toEqual(['system', 'admin-index', 'admin-add']);
          done();
        }, 500);
      }
    });
  });

  it('Test loading url is /', (done) => {
    zone.run(() => {
      router.navigate(['/']);
    });
    setTimeout(() => {
      expect(support.title).toEqual('');
      expect(support.breadcrumb).toEqual([]);
      expect(support.navActive).toEqual([]);
      support.unsubscribe();
      done();
    }, 500);
  });

  it('Test initialization breadcrumb when url is not /', (done) => {
    zone.run(() => {
      router.navigate(['{admin-edit}/2']).then(() => {
        support.setup(router);
      });
    });
    setTimeout(() => {
      expect(support.title.zh_cn).toBe('管理员修改');
      expect(support.breadcrumb.length).toBe(3);
      for (const value of support.breadcrumb) {
        expect(
          Reflect.has(value, 'key') &&
          Reflect.has(value, 'name') &&
          Reflect.has(value, 'router')
        ).toBeTruthy();
      }
      expect(support.breadcrumb[0].name.zh_cn).toBe('系统设置');
      expect(support.breadcrumb[0].key).toBe('system');
      expect(support.breadcrumb[0].router).toBe(0);
      expect(support.breadcrumb[1].name.zh_cn).toBe('管理员');
      expect(support.breadcrumb[1].key).toBe('admin-index');
      expect(support.breadcrumb[1].router).toBe(1);
      expect(support.breadcrumb[2].name.zh_cn).toBe('管理员修改');
      expect(support.breadcrumb[2].key).toBe('admin-edit');
      expect(support.breadcrumb[2].router).toBe(1);
      expect(support.navActive).toEqual(['system', 'admin-index', 'admin-edit']);
      done();
    }, 500);
  });

  it('Test not exists router link', (done) => {
    zone.run(() => {
      router.navigate(['{unknown}']);
    });
    setTimeout(() => {
      expect(support.title).toEqual('');
      expect(support.breadcrumb).toEqual([]);
      expect(support.navActive).toEqual([]);
      done();
    }, 500);
  });

  it('Test clear support storage', (done) => {
    storage.has('resource').pipe(
      switchMap(status => {
        expect(status).toBeTruthy();
        return storage.get('resource');
      }),
      switchMap((data: Map<any, any>) => {
        expect(data).not.toBeNull();
        expect(data.get('system').name).toBe('{"zh_cn":"系统设置","en_us":"System"}');
        return storage.has('router');
      }),
      switchMap(status => {
        expect(status).toBeTruthy();
        return storage.get('router');
      })
    ).subscribe((data: Map<any, any>) => {
      expect(data).not.toBeNull();
      expect(data.get('resource-add').name).toBe('{"zh_cn":"资源控制新增","en_us":"Resource Add"}');
      support.clearStorage();
      setTimeout(() => {
        storage.has('resource').pipe(
          switchMap(status => {
            expect(status).toBeFalsy();
            return storage.has('router');
          })
        ).subscribe(status => {
          expect(status).toBeFalsy();
          done();
        });
      }, 500);
    });
  });

  it('Unsubscribe support events', () => {
    try {
      support.unsubscribe();
      expect().nothing();
    } catch (e) {
      fail(e);
    }
  });

});
