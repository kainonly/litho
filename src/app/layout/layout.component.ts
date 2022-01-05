import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
    this.taskToRefreshToken();
  }

  ngOnDestroy(): void {
    if (this.autoRefreshToken) {
      this.autoRefreshToken.unsubscribe();
    }
  }

  private taskToRefreshToken(): void {
    // this.autoRefreshToken = timer(this.app.browserRefresh ? 0 : 600000)
    //   .pipe(
    //     switchMap(() =>
    //       this.app.code().pipe(
    //         map(v => {
    //           if (v.code) {
    //             this.autoRefreshToken.unsubscribe();
    //             return;
    //           }
    //           return v.data.code;
    //         })
    //       )
    //     ),
    //     switchMap(code => this.app.refreshToken(code))
    //   )
    //   .subscribe(() => {
    //     this.app.browserRefresh = false;
    //     this.taskToRefreshToken();
    //   });
  }
}
