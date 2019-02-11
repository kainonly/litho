import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {BitService, EventsService, getRouteName} from 'dev-ngx-bit';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {NzNotificationService} from 'ng-zorro-antd';
import {MainService} from '../api/main.service';
import {CenterService} from '../api/center.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {
  collapsed = false;
  breadcrumb: any[] = [];
  breadtitle: string = null;
  nav_lists: any[] = [];
  actives = [];
  private routerEvents: Subscription;
  private param = {};

  constructor(private router: Router,
              private mainService: MainService,
              private centerService: CenterService,
              private events: EventsService,
              public storage: LocalStorage,
              private notification: NzNotificationService,
              public bit: BitService) {
  }

  ngOnInit() {
    this.getMenuLists();
    this.events.on('history').subscribe(args => {
      this.param = args;
    });
    this.events.on('refresh-menu').subscribe(() => {
      if (this.routerEvents) {
        this.routerEvents.unsubscribe();
      }
      this.getMenuLists();
    });
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe();
    this.events.off('history');
    this.events.off('refresh-menu');
  }

  private getMenuLists() {
    this.mainService.menu().pipe(
      map(data => {
        this.nav_lists = data.nav;
        return {menu: data.menu, route: data.route};
      }),
      switchMap(data => this.bit.setMenu(data))
    ).subscribe(() => {
      if (this.router.url !== '/') {
        this.initNav(this.router.url);
      }
      this.routerEvents = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url !== '/') {
            this.initNav(event.url);
          } else {
            this.emptyNav();
          }
        }
      });
    });
  }

  private initNav(url: string) {
    const routename = getRouteName(url);
    this.bit.getMenu(routename).subscribe(data => {
      if (data) {
        this.breadcrumb = data.breadcrumb;
        this.breadtitle = data.breadcrumb[data.breadcrumb.length - 1].name;
        this.actives = data.actives;
      } else {
        this.router.navigate(['/{empty}']);
        this.emptyNav();
      }
    });
  }

  private emptyNav() {
    this.breadcrumb = [];
    this.actives = [];
    this.breadtitle = null;
  }

  breadLink(link: string) {
    this.router.navigate([`{${link}}` + (this.param[link] ? this.param[link] : '')]);
    this.param = {};
  }

  logout() {
    this.centerService.clear().subscribe(() => {
      this.storage.removeItemSubscribe('menu');
      this.storage.removeItemSubscribe('route');
      localStorage.removeItem('username');
      sessionStorage.removeItem('login');
      this.router.navigateByUrl('/login');
      this.notification.success(this.bit.l['logout'], this.bit.l['logout_success']);
    });
  }

}
