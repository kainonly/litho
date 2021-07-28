import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppService } from '@common/app.service';
import { Resource } from '@common/data';
import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  navs: Resource[] = [];
  actived!: string;
  private events$!: Subscription;

  constructor(public bit: BitService, private app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.app.resource().subscribe(data => {
      this.navs = data.navs;
    });
    this.setActived(this.router.url);
    this.events$ = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      this.setActived(event.urlAfterRedirects);
    });
  }

  ngOnDestroy(): void {
    this.events$.unsubscribe();
  }

  private setActived(url: string): void {
    this.actived = url.slice(1).split('/')[0];
  }

  /**
   * 返回层级
   */
  level(nav: Resource): number {
    return nav.url.length * 16;
  }
}
