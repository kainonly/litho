import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { map, switchMap, throttleTime } from 'rxjs/operators';

import { AppService } from '@common/app.service';
import { BitRouterService } from 'ngx-bit/router';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private autoRefreshToken!: Subscription;

  constructor(public app: AppService, public router: BitRouterService) {}

  ngOnInit(): void {
    this.taskToRefreshToken();
    this.app.resources().subscribe(data => {
      this.router.resources.next(data);
    });
  }

  ngOnDestroy(): void {
    this.autoRefreshToken.unsubscribe();
  }

  private taskToRefreshToken(): void {
    this.autoRefreshToken = timer(this.app.browserRefresh ? 0 : 600000)
      .pipe(
        switchMap(() =>
          this.app.code().pipe(
            map(res => {
              if (res.error) {
                this.autoRefreshToken.unsubscribe();
                return;
              }
              return res.data.code;
            })
          )
        ),
        switchMap(code => this.app.refreshToken(code))
      )
      .subscribe(res => {
        this.app.browserRefresh = false;
        this.taskToRefreshToken();
      });
  }
}
