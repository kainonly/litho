import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/components/layout/profile/profile.component';
import { QuickComponent } from '@common/components/layout/quick/quick.component';
import { WpxService } from '@weplanx/ng';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('quickTitleTpl') quickTitleTpl!: TemplateRef<any>;
  private quickRef?: NzDrawerRef;

  constructor(
    private wpx: WpxService,
    public app: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private drawer: NzDrawerService
  ) {}

  quick(): void {
    this.quickRef = this.drawer.create<QuickComponent>({
      nzTitle: this.quickTitleTpl,
      nzContent: QuickComponent,
      nzPlacement: 'left'
    });
  }

  closeQuick(): void {
    this.quickRef?.close();
  }

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzTitle: $localize`个人中心`,
      nzWidth: '800px',
      nzContent: ProfileComponent
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }
}
