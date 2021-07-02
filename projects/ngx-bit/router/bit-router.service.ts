import { Injectable, TemplateRef } from '@angular/core';
import { NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BreadcrumbOption, RouterData } from './types';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({ providedIn: 'root' })
export class BitRouterService {
  /**
   * 被激活的导航
   * Activated navigation
   */
  navActive: any[] = [];
  /**
   * 允许返回
   * Allow back
   */
  back = false;
  /**
   * Title
   */
  title: any = null;
  /**
   * SubTitle
   */
  subTitle: any = null;
  /**
   * default breadcrumb Root
   */
  breadcrumbRoot: any = 0;
  /**
   * Breadcrumb array
   */
  breadcrumb: BreadcrumbOption[];
  /**
   * Header banner
   */
  banner: TemplateRef<any>;
  /**
   * Header banner
   */
  tags: TemplateRef<any>;
  /**
   * Header actions
   */
  actions: TemplateRef<any>[] = [];
  /**
   * Header banner
   */
  content: TemplateRef<any>;
  /**
   * Header banner
   */
  footer: TemplateRef<any>;
  /**
   * Status
   */
  changed: Subject<any> = new Subject();

  /**
   * Angular routed event subscription
   */
  private events$: Subscription;

  constructor(
    private router: Router,
    private storage: StorageMap
  ) {
  }

  /**
   * 初始化平行路由
   * Initialize parallel routing
   */
  setup(): void {
    if (this.events$) {
      return;
    }
    if (this.router.url !== '/') {
      this.match(this.router, this.router.url);
    }
    this.events$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url !== '/') {
        this.match(this.router, event.url);
      } else {
        this.clearBreadcrumb();
      }
    });
  }

  /**
   * 设置平行路由数据，同步导航与页头
   * Set parallel routing data, synchronize navigation and page header
   */
  setData(data: RouterData): void {
    this.storage.set('resource', data.resource).subscribe(_ => _);
    this.storage.set('router', data.router).subscribe(_ => _);
  }

  /**
   * 取消平行路由逻辑
   * Cancel parallel routing logic
   */
  uninstall(): void {
    if (this.events$) {
      this.events$.unsubscribe();
    }
  }

  private match(router: Router, url: string): void {
    const primary = router.parseUrl(url).root.children[PRIMARY_OUTLET];
    const segments = primary.segments;
    this.storage.get('router').pipe(
      map((data: any) => {
        if (data) {
          for (let i = 0; i < segments.length; i++) {
            const key = segments.slice(0, i + 1).map(v => v.path).join('/');
            if (data.hasOwnProperty(key)) {
              return key;
            }
          }
        }
        return null;
      })
    ).subscribe(maybeKey => {
      if (!maybeKey) {
        router.navigate(['/empty']);
        this.clearBreadcrumb();
      } else {
        this.dynamicBreadcrumb(maybeKey);
      }
    });
  }

  private dynamicBreadcrumb(key: string): void {
    this.storage.get('resource').subscribe((data: object) => {
      const queue = [];
      const breadcrumb: BreadcrumbOption[] = [];
      const navActive = [];
      if (data.hasOwnProperty(key)) {
        const node = data[key];
        const name = JSON.parse(node.name);
        this.title = name;
        navActive.unshift(node.key);
        breadcrumb.unshift({
          name,
          key: node.key,
          router: node.router
        });
        if (node.parent !== this.breadcrumbRoot) {
          queue.push(node.parent);
        }
      }
      while (queue.length !== this.breadcrumbRoot) {
        const parentKey = queue.pop();

        if (data.hasOwnProperty(parentKey)) {
          const next = data[parentKey];
          navActive.unshift(next.key);
          breadcrumb.unshift({
            name: JSON.parse(next.name),
            key: next.key,
            router: next.router
          });
          if (next.parent !== this.breadcrumbRoot) {
            queue.push(next.parent);
          }
        }
      }
      this.navActive = navActive;
      this.breadcrumb = breadcrumb;
    });
  }

  private clearBreadcrumb(): void {
    this.navActive = [];
    this.breadcrumb = [];
    this.title = null;
  }
}
