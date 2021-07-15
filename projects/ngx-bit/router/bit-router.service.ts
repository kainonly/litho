import { Injectable, TemplateRef } from '@angular/core';
import { NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';

import { BreadcrumbOption, RouterData } from './types';

@Injectable({ providedIn: 'root' })
export class BitRouterService {
  /**
   * 被激活的导航
   */
  navActive: any[] = [];
  /**
   * 允许返回
   */
  back = false;
  /**
   * 页头标题部分
   */
  title: any = null;
  /**
   * 页头子标题部分
   */
  subTitle: any = null;
  /**
   * 面包屑默认顶点
   */
  breadcrumbRoot: any = 0;
  /**
   * 面包屑数据
   */
  breadcrumb?: BreadcrumbOption[];
  /**
   * 顶部公告
   */
  banner?: TemplateRef<any>;
  /**
   * 页头标题 Tags
   */
  tags?: TemplateRef<any>;
  /**
   * 页头操作部分
   */
  actions?: TemplateRef<any>[] = [];
  /**
   * 页头内容部分
   */
  content?: TemplateRef<any>;
  /**
   * 页头底部部分
   */
  footer?: TemplateRef<any>;
  /**
   * 平行路由状态
   */
  changed: Subject<any> = new Subject();
  private events$!: Subscription;

  constructor(private router: Router, private storage: StorageMap) {}

  /**
   * 初始化平行路由
   */
  setup(): void {
    if (this.events$) {
      return;
    }
    if (this.router.url !== '/') {
      this.match(this.router, this.router.url);
    }
    this.events$ = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url !== '/') {
        this.match(this.router, event.url);
      } else {
        this.clearBreadcrumb();
      }
    });
  }

  /**
   * 设置平行路由数据，同步导航与页头
   */
  setData(data: RouterData): void {
    this.storage.set('resource', data.resource).subscribe(_ => _);
    this.storage.set('router', data.router).subscribe(_ => _);
  }

  /**
   * 取消平行路由逻辑
   */
  uninstall(): void {
    if (this.events$) {
      this.events$.unsubscribe();
    }
  }

  private match(router: Router, url: string): void {
    const primary = router.parseUrl(url).root.children[PRIMARY_OUTLET];
    const segments = primary.segments;
    this.storage
      .get('router')
      .pipe(
        map((data: any) => {
          if (data) {
            for (let i = 0; i < segments.length; i++) {
              const key = segments
                .slice(0, i + 1)
                .map(v => v.path)
                .join('/');
              if (data.hasOwnProperty(key)) {
                return key;
              }
            }
          }
          return null;
        })
      )
      .subscribe(maybeKey => {
        if (!maybeKey) {
          router.navigate(['/empty']);
          this.clearBreadcrumb();
        } else {
          this.dynamicBreadcrumb(maybeKey);
        }
      });
  }

  private dynamicBreadcrumb(key: string): void {
    this.storage.get('resource').subscribe((data: any) => {
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
        const parentKey: string = queue.pop();

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
