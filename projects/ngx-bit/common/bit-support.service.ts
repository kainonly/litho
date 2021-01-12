import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { BreadcrumbOption } from 'ngx-bit/types';
import { getSelectorFormUrl } from 'ngx-bit/operates';

@Injectable()
export class BitSupportService {
  /**
   * Title
   */
  title: any = '';
  /**
   * SubTitle
   */
  subTitle: any;
  /**
   * Breadcrumb array
   */
  breadcrumb: BreadcrumbOption[] = [];
  /**
   * default breadcrumb top level
   */
  breadcrumbTop: any = 0;
  /**
   * Nav active array
   */
  navActive: any[] = [];
  /**
   * Allow back
   */
  back = false;
  /**
   * Header banner
   */
  banner: TemplateRef<any>;
  /**
   * Header actions
   */
  actions: TemplateRef<any>;
  /**
   * Support status
   */
  status: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Router events
   */
  private routerEvents: Subscription;

  constructor(
    private storageMap: StorageMap
  ) {
  }

  /**
   * Manual set breadcrumb
   */
  setBreadcrumb(...breadcrumb: BreadcrumbOption[]): void {
    this.breadcrumb = breadcrumb;
  }

  /**
   * Set resource data
   */
  setResource(resource: Map<string, any>, router: Map<string, any>): void {
    this.storageMap.set('resource', resource).subscribe(() => {
      // ok
    });
    this.storageMap.set('router', router).subscribe(() => {
      // ok
    });
  }

  /**
   * Setup support
   */
  setup(router: Router, match: string[] = ['%7B', '%7D']): void {
    this.unsubscribe();
    if (router.url !== '/') {
      this.routerAssociate(router, router.url, match);
    }
    this.routerEvents = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/') {
          this.routerAssociate(router, event.url, match);
        } else {
          this.clearBreadcrumb();
        }
      }
    });
  }

  /**
   * Clear breadcrumb
   */
  private clearBreadcrumb(): void {
    this.navActive = [];
    this.breadcrumb = [];
    this.title = '';
  }

  /**
   * Get router associate
   */
  private routerAssociate(router: Router, url: string, match?: string[]): void {
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
  private factoryBreadcrumb(key: string): void {
    this.storageMap.get('resource').subscribe((data: Map<string, any>) => {
      const queue = [];
      const breadcrumb: BreadcrumbOption[] = [];
      const navActive = [];
      if (data.has(key)) {
        const node = data.get(key);
        const name = JSON.parse(node.name);
        this.title = name;
        navActive.unshift(node.key);
        breadcrumb.unshift({
          name,
          key: node.key,
          router: node.router
        });
        if (node.parent !== this.breadcrumbTop) {
          queue.push(node.parent);
        }
      }
      while (queue.length !== this.breadcrumbTop) {
        const parentKey = queue.pop();
        if (data.has(parentKey)) {
          const next = data.get(parentKey);
          navActive.unshift(next.key);
          breadcrumb.unshift({
            name: JSON.parse(next.name),
            key: next.key,
            router: next.router
          });
          if (next.parent !== this.breadcrumbTop) {
            queue.push(next.parent);
          }
        }
      }
      this.navActive = navActive;
      this.breadcrumb = breadcrumb;
    });
  }

  /**
   * Clear support storage
   */
  clearStorage(): void {
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
   * Unsubscribe support events
   */
  unsubscribe(): void {
    if (this.routerEvents) {
      this.routerEvents.unsubscribe();
    }
  }

}
