import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommonService } from '@common/common.service';
import { UserInfo } from '@common/types';
import { environment } from '@env';
import { Nav, WpxService } from '@weplanx/ng';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * 当前日期
   */
  year = new Date().getFullYear();

  openIds: Set<string> = new Set<string>();
  private pageIdSubscription!: Subscription;

  constructor(
    private nzIconService: NzIconService,
    public wpx: WpxService,
    public common: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nzIconService.changeAssetsSource(environment.cdn);
    this.wpx.setAssets(environment.cdn);
    this.wpx.navsRecord.subscribe(record => {
      this.pageIdSubscription = this.wpx.pageId.subscribe(id => {
        this.openIds.clear();
        let node: Nav | undefined = record[id];
        while (node) {
          this.openIds.add(node._id);
          node = node.parentNode ?? undefined;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.pageIdSubscription.unsubscribe();
  }

  logout(): void {
    this.common.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
      // this.wpxOnLogout.emit(undefined);
    });
  }
}
