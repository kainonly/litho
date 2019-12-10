import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {getSelectorFormUrl} from '../lib.common';
import {BitService} from '../common/bit.service';

@Injectable()
export class StorageService {
  /**
   * Router subscription
   */
  private routerSubscription: Subscription;
  private prevUrl: string;

  constructor(
    private storageMap: StorageMap,
    private bit: BitService
  ) {
  }

  /**
   * Clear Ngx Bit Storage
   */
  clear() {
    this.storageMap.keys().pipe(
      filter(v =>
        ['resource', 'router'].includes(v) ||
        v.search(/^search:\S+$/) !== -1 ||
        v.search(/^page:\S+$/) !== -1 ||
        v.search(/^cross:\S+$/) !== -1
      ),
      switchMap(key => this.storageMap.delete(key))
    ).subscribe(() => {
    });
  }

  /**
   * Put Resource Data
   */
  putResource(resource: Map<string, any>, router: Map<string, any>) {
    this.storageMap.set('resource', resource).subscribe(() => {
    });
    this.storageMap.set('router', router).subscribe(() => {
    });
  }

  /**
   * Auto Breadcrumb & PageIndex
   */
  setup(router: Router, match = ['%7B', '%7D']) {
    this.destory();
    if (router.url !== '/') {
      this.autoPageIndex(router.url, match);
      this.routerAssociate(router, router.url, match);
    }
    this.routerSubscription = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/') {
          this.autoPageIndex(event.url, match);
          this.routerAssociate(router, event.url, match);
        } else {
          this.clearBreadcrumb();
        }
      }
    });
  }

  /**
   * Destory Storage
   */
  destory() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.prevUrl = null;
  }

  /**
   * Auto Page Index
   */
  private autoPageIndex(url: string, match?: any[]) {
    if (this.prevUrl) {
      if (this.bit.listsPageIndex !== 1) {
        this.storageMap.set(
          'page:' + this.prevUrl,
          this.bit.listsPageIndex
        ).subscribe(() => {
        });
      } else {
        this.storageMap.delete(
          'page:' + this.prevUrl
        ).subscribe(() => {
        });
      }
    }
    this.prevUrl = getSelectorFormUrl(url, match);
    this.storageMap.get(
      'page:' + this.prevUrl
    ).subscribe((index: number) => {
      this.bit.listsPageIndex = index ? index : 1;
    });
  }

  /**
   * Clear breadcrumb
   */
  private clearBreadcrumb() {
    this.bit.navActive = [];
    this.bit.breadcrumb = [];
    this.bit.title = '';
  }

  /**
   * Get router associate
   */
  private routerAssociate(router: Router, url: string, match?: any[]) {
    const key = getSelectorFormUrl(url, match);
    this.storageMap.get('router').pipe(
      map((data: Map<string, any>) =>
        data.has(key) ? key : null
      )
    ).subscribe(maybeKey => {
      if (!maybeKey) {
        router.navigate(['/{empty}']);
        this.clearBreadcrumb();
      } else {
        this.factoryBreadcrumb(maybeKey);
      }
    });
  }

  /**
   * Factory breadcrumb
   */
  private factoryBreadcrumb(key: string) {
    this.storageMap.get('resource').subscribe((data: Map<string, any>) => {
      const queue = [];
      const breadcrumb = [];
      const navActive = [];
      if (data.has(key)) {
        const node = data.get(key);
        this.bit.title = node.name;
        navActive.unshift(node.key);
        breadcrumb.unshift({
          name: node.name,
          key: node.key,
          router: node.router
        });
        if (node.parent !== this.bit.breadcrumbTop) {
          queue.push(node.parent);
        }
      }
      while (queue.length !== this.bit.breadcrumbTop) {
        const parentKey = queue.pop();
        if (data.has(parentKey)) {
          const next = data.get(parentKey);
          navActive.unshift(next.key);
          breadcrumb.unshift({
            name: next.name,
            key: next.key,
            router: next.router
          });
          if (next.parent !== this.bit.breadcrumbTop) {
            queue.push(next.parent);
          }
        }
      }

      this.bit.navActive = navActive;
      this.bit.breadcrumb = breadcrumb;
    });
  }
}
