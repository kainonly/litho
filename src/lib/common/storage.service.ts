import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Event, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {BitService} from '../base/bit.service';

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
   * Set Menu Storage
   */
  setMenu(menu: any, router: any) {
    this.storageMap.set('menu', menu).subscribe(() => {
    });
    this.storageMap.set('router', router).subscribe(() => {
    });
  }

  /**
   * Auto get breadcrumb
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
    const path = BitService.getSelectorFormUrl(url, match);
    this.storageMap.get('router').pipe(
      map((data: any) =>
        Reflect.has(data, path) ? data[path].id : false
      )
    ).subscribe(maybeId => {
      if (!maybeId) {
        router.navigate(['/{empty}']);
        this.clearBreadcrumb();
      } else {
        this.factoryBreadcrumb(maybeId);
      }
    });
  }

  /**
   * Factory breadcrumb
   */
  private factoryBreadcrumb(id: any) {
    this.storageMap.get('menu').subscribe((data: any) => {
      const queue = [];
      const breadcrumb = [];
      const navActive = [];
      if (data.hasOwnProperty(id)) {
        const node = data[id];
        this.bit.title = node.name;
        navActive.unshift(node.id);
        breadcrumb.unshift({
          name: node.name,
          routerlink: node.routerlink
        });
        if (node.parent !== this.bit.breadcrumbTop) {
          queue.push(node.parent);
        }
      }
      while (queue.length !== this.bit.breadcrumbTop) {
        const parentId = queue.pop();
        if (data.hasOwnProperty(parentId)) {
          const next = data[parentId];
          navActive.unshift(next.id);
          breadcrumb.unshift({
            name: next.name,
            routerlink: next.routerlink
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
