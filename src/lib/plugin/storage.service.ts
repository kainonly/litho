import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Event, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {BitService} from '../common/bit.service';

@Injectable()
export class StorageService {
  /**
   * Router subscription
   */
  private routerSubscription: Subscription;

  constructor(
    private storageMap: StorageMap,
    private bit: BitService
  ) {
  }

  /**
   * Clear all Storage
   */
  clear() {
    this.storageMap.clear().subscribe(() => {
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
   * Auto Breadcrumb Data
   */
  autoBreadcrumb(router: Router, match = ['%7B', '%7D']) {
    this.destoryBreadcrumb();
    if (router.url !== '/') {
      this.routerAssociate(router, router.url, match);
    }
    this.routerSubscription = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/') {
          this.routerAssociate(router, event.url, match);
        } else {
          this.clearBreadcrumb();
        }
      }
    });
  }

  /**
   * Destory breadcrumb
   */
  destoryBreadcrumb() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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
    const key = BitService.getSelectorFormUrl(url, match);
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
          key: node.key
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
            key: next.key
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
