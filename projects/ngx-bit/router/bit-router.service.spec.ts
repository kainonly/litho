import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitModule } from 'ngx-bit';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { environment } from '../simulation/environment';
import { BitRouterService } from 'ngx-bit/router';

describe('BitRouterService', () => {
  let bitRouter: BitRouterService;
  let router: Router;
  let zone: NgZone;
  let storage: StorageMap;
  let location: Location;

  beforeEach(() => {
    if (!bitRouter) {
      TestBed.configureTestingModule({
        imports: [
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
            }
          ]),
          BitModule.forRoot(environment.bit)
        ]
      });
      bitRouter = TestBed.inject(BitRouterService);
      router = TestBed.inject(Router);
      zone = TestBed.inject(NgZone);
      storage = TestBed.inject(StorageMap);
      location = TestBed.inject(Location);
    }
  });

  it('Set resource data and setup support', (done) => {
    // @ts-ignore
    import('../simulation/resource.json').then(res => {
      const resourceData: object = {};
      const routerData: object = {};
      const nav: any = [];

      if (!res.error) {
        for (const x of res.data) {
          resourceData[x.key] = x;
          if (x.router === 1) {
            routerData[x.key] = x;
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
            if (resourceData.hasOwnProperty(parent)) {
              const rows = resourceData[parent];
              if (!rows.hasOwnProperty('children')) {
                rows.children = [];
              }
              rows.children.push(x);
            }
          }
        }
        bitRouter.setData({
          resource: resourceData,
          router: routerData
        });
        expect(nav).not.toBeNull();
        bitRouter.setup();
        zone.run(() => {
          router.navigate(['admin-add']);
        });
        setTimeout(() => {
          expect(bitRouter.title.zh_cn).toBe('管理员新增');
          expect(bitRouter.breadcrumb.length).toBe(3);
          for (const value of bitRouter.breadcrumb) {
            expect(
              Reflect.has(value, 'key') &&
              Reflect.has(value, 'name') &&
              Reflect.has(value, 'router')
            ).toBeTruthy();
          }
          expect(bitRouter.breadcrumb[0].name.zh_cn).toBe('系统设置');
          expect(bitRouter.breadcrumb[0].key).toBe('system');
          expect(bitRouter.breadcrumb[0].router).toBe(0);
          expect(bitRouter.breadcrumb[1].name.zh_cn).toBe('管理员');
          expect(bitRouter.breadcrumb[1].key).toBe('admin-index');
          expect(bitRouter.breadcrumb[1].router).toBe(1);
          expect(bitRouter.breadcrumb[2].name.zh_cn).toBe('管理员新增');
          expect(bitRouter.breadcrumb[2].key).toBe('admin-add');
          expect(bitRouter.breadcrumb[2].router).toBe(1);
          expect(bitRouter.navActive).toEqual(['system', 'admin-index', 'admin-add']);
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
      expect(bitRouter.title).toEqual('');
      expect(bitRouter.breadcrumb).toEqual([]);
      expect(bitRouter.navActive).toEqual([]);
      bitRouter.uninstall();
      done();
    }, 500);
  });

  it('Test initialization breadcrumb when url is not /', (done) => {
    zone.run(() => {
      router.navigate(['admin-edit/2']).then(() => {
        bitRouter.setup();
      });
    });
    setTimeout(() => {
      expect(bitRouter.title.zh_cn).toBe('管理员修改');
      expect(bitRouter.breadcrumb.length).toBe(3);
      for (const value of bitRouter.breadcrumb) {
        expect(
          Reflect.has(value, 'key') &&
          Reflect.has(value, 'name') &&
          Reflect.has(value, 'router')
        ).toBeTruthy();
      }
      expect(bitRouter.breadcrumb[0].name.zh_cn).toBe('系统设置');
      expect(bitRouter.breadcrumb[0].key).toBe('system');
      expect(bitRouter.breadcrumb[0].router).toBe(0);
      expect(bitRouter.breadcrumb[1].name.zh_cn).toBe('管理员');
      expect(bitRouter.breadcrumb[1].key).toBe('admin-index');
      expect(bitRouter.breadcrumb[1].router).toBe(1);
      expect(bitRouter.breadcrumb[2].name.zh_cn).toBe('管理员修改');
      expect(bitRouter.breadcrumb[2].key).toBe('admin-edit');
      expect(bitRouter.breadcrumb[2].router).toBe(1);
      expect(bitRouter.navActive).toEqual(['system', 'admin-index', 'admin-edit']);
      done();
    }, 500);
  });

  it('Test not exists router link', (done) => {
    zone.run(() => {
      router.navigate(['unknown']);
    });
    setTimeout(() => {
      expect(bitRouter.title).toEqual('');
      expect(bitRouter.breadcrumb).toEqual([]);
      expect(bitRouter.navActive).toEqual([]);
      done();
    }, 500);
  });
});
