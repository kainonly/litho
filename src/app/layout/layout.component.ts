import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@common/app.service';
import { WpxService } from '@weplanx/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private autoRefreshToken!: Subscription;

  constructor(public app: AppService, public wpx: WpxService) {}

  ngOnInit(): void {
    this.app.api().subscribe(data => {
      this.wpx.loadPages(data.navs);
    });
    this.taskToRefreshToken();
  }

  ngOnDestroy(): void {
    if (this.autoRefreshToken) {
      this.autoRefreshToken.unsubscribe();
    }
  }

  private taskToRefreshToken(): void {
    this.autoRefreshToken = timer(this.app.browserRefresh ? 0 : 600000)
      .pipe(
        switchMap(() =>
          this.app.code().pipe(
            map(v => {
              return v.code;
            })
          )
        ),
        switchMap(code => this.app.refreshToken(code))
      )
      .subscribe(() => {
        this.app.browserRefresh = false;
        this.taskToRefreshToken();
      });
  }
}
