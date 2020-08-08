import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { environment } from '@env';
import { BitSupportService, NgxBitModule } from 'ngx-bit';
import { BreadcrumbOption } from 'ngx-bit/types';

describe('BitSupportService', () => {
  let support: BitSupportService;
  let router: Router;

  beforeEach(() => {
    if (!support) {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      support = TestBed.inject(BitSupportService);
      router = TestBed.inject(Router);
    }
  });

  it('Test manual set breadcrumb', () => {
    const data: BreadcrumbOption[] = [
      {
        name: {
          zh_cn: '测试1'
        },
        key: 'test2',
        router: true
      }, {
        name: {
          zh_cn: '测试2'
        },
        key: 'test2',
        router: true
      }
    ];
    support.setBreadcrumb(...data);
    for (const index in support.breadcrumb) {
      if (Reflect.has(support.breadcrumb, index)) {
        expect(support.breadcrumb[index].key).toBe(data[index].key);
      }
    }
  });

  it('Test auto set breadcrumb', (done) => {
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
        done();
      }
    });
    // support.autoBreadcrumb(router);
  });

});
