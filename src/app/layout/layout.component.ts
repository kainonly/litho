import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';
import { map, switchMap, throttleTime } from 'rxjs/operators';

import { AppService } from '@common/app.service';
import { WpxLayoutService } from '@weplanx/ngx/layout';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private autoRefreshToken!: Subscription;

  constructor(public app: AppService, public wpxLayout: WpxLayoutService, private router: Router) {}

  ngOnInit(): void {
    // this.taskToRefreshToken();
    // this.router.resetConfig([
    //   { path: 'role', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) }
    // ]);
    this.app.pages().subscribe(data => {
      this.wpxLayout.pages.next(data);
    });
  }

  ngOnDestroy(): void {
    this.autoRefreshToken.unsubscribe();
  }

  activated(): void {
    this.wpxLayout.matchRouter();
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
