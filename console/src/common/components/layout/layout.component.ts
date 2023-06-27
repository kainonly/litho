import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/components/layout/profile/profile.component';
import { WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(
    private wpx: WpxService,
    public app: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private drawer: NzDrawerService
  ) {}

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzTitle: $localize`个人中心`,
      nzWidth: '800px',
      nzContent: ProfileComponent
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      // this.app.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }
}
