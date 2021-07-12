import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitModule } from 'ngx-bit';
import { Location } from '@angular/common';
import { environment } from '@mock/env';
import { BitRouterService } from 'ngx-bit/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '@mock/routes';
import { resourceData } from '@mock/dataset';
import { delay, filter, take } from 'rxjs/operators';

describe('BitRouterService', () => {
  let router: Router;
  let storage: StorageMap;
  let location: Location;
  let bitRouter: BitRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot(routes), BitModule.forRoot(environment.bit)]
    });
    router = TestBed.inject(Router);
    storage = TestBed.inject(StorageMap);
    location = TestBed.inject(Location);
    bitRouter = TestBed.inject(BitRouterService);
    bitRouter.setup();
  });

  function setData(): void {
    const resourceMap: Record<string, any> = {};
    const routerMap: Record<string, any> = {};
    const nav: any = [];
    for (const x of resourceData) {
      resourceMap[x.key] = x;
      if (x.router === 1) {
        routerMap[x.key] = x;
      }
    }
    for (const x of resourceData) {
      if (!x.nav) {
        continue;
      }
      if (x.parent === 'origin') {
        nav.push(x);
      } else {
        const parent = x.parent;
        if (resourceMap.hasOwnProperty(parent)) {
          const rows = resourceMap[parent];
          if (!rows.hasOwnProperty('children')) {
            rows.children = [];
          }
          rows.children.push(x);
        }
      }
    }
    bitRouter.setData({
      resource: resourceMap,
      router: routerMap
    });
    expect(nav).not.toBeNull();
  }

  it('Set resource data and setup support', done => {
    setData();
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1),
        delay(200)
      )
      .subscribe(() => {
        expect(bitRouter.title.zh_cn).toBe('测试新增页');
        expect(bitRouter.breadcrumb!.length).toBe(3);
        for (const value of bitRouter.breadcrumb!) {
          expect(Reflect.has(value, 'key') && Reflect.has(value, 'name') && Reflect.has(value, 'router')).toBeTruthy();
        }
        expect(bitRouter.breadcrumb![0].name.zh_cn).toBe('系统设置');
        expect(bitRouter.breadcrumb![0].key).toBe('system');
        expect(bitRouter.breadcrumb![0].router).toBe(0);
        expect(bitRouter.breadcrumb![1].name.zh_cn).toBe('测试主页');
        expect(bitRouter.breadcrumb![1].key).toBe('example-index');
        expect(bitRouter.breadcrumb![1].router).toBe(1);
        expect(bitRouter.breadcrumb![2].name.zh_cn).toBe('测试新增页');
        expect(bitRouter.breadcrumb![2].key).toBe('example-add');
        expect(bitRouter.breadcrumb![2].router).toBe(1);
        expect(bitRouter.navActive).toEqual(['system', 'example-index', 'example-add']);
        done();
      });
    router.navigate(['example-add']);
  });

  it('Test loading url is /', done => {
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1),
        delay(200)
      )
      .subscribe(() => {
        expect(bitRouter.title).toEqual(null);
        expect(bitRouter.breadcrumb).toEqual([]);
        expect(bitRouter.navActive).toEqual([]);
        bitRouter.uninstall();
        done();
      });
    router.navigate(['/']);
  });

  it('Test initialization breadcrumb when url is not /', done => {
    setData();
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1),
        delay(200)
      )
      .subscribe(() => {
        expect(bitRouter.title.zh_cn).toBe('测试修改页');
        expect(bitRouter.breadcrumb!.length).toBe(3);
        for (const value of bitRouter.breadcrumb!) {
          expect(Reflect.has(value, 'key') && Reflect.has(value, 'name') && Reflect.has(value, 'router')).toBeTruthy();
        }
        expect(bitRouter.breadcrumb![0].name.zh_cn).toBe('系统设置');
        expect(bitRouter.breadcrumb![0].key).toBe('system');
        expect(bitRouter.breadcrumb![0].router).toBe(0);
        expect(bitRouter.breadcrumb![1].name.zh_cn).toBe('测试主页');
        expect(bitRouter.breadcrumb![1].key).toBe('example-index');
        expect(bitRouter.breadcrumb![1].router).toBe(1);
        expect(bitRouter.breadcrumb![2].name.zh_cn).toBe('测试修改页');
        expect(bitRouter.breadcrumb![2].key).toBe('example-edit');
        expect(bitRouter.breadcrumb![2].router).toBe(1);
        expect(bitRouter.navActive).toEqual(['system', 'example-index', 'example-edit']);
        done();
      });
    router.navigate(['example-edit', '123']);
  });

  it('Test not exists router link', done => {
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1),
        delay(200)
      )
      .subscribe(() => {
        expect(bitRouter.title).toEqual(null);
        expect(bitRouter.breadcrumb).toEqual([]);
        expect(bitRouter.navActive).toEqual([]);
        done();
      });
    router.navigate(['not_exists_path']);
  });
});
