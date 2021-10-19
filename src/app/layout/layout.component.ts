import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@common/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private autoRefreshToken!: Subscription;

  constructor(public app: AppService) {}

  ngOnInit(): void {
    // this.taskToRefreshToken();
    this.app.pages().subscribe(() => {});
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
