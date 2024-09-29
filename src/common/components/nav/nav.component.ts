import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/components/nav/profile/profile.component';
import { ShareModule } from '@common/share.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  standalone: true,
  imports: [ShareModule, NzBreadCrumbModule, NzPopoverModule],
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.less'
})
export class NavComponent {
  @Input() breadcrumbs?: TemplateRef<void>;

  constructor(
    public app: AppService,
    private drawer: NzDrawerService,
    private router: Router
  ) {}

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzWidth: 640,
      nzContent: ProfileComponent,
      nzClosable: false
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.activeUser.set(null);
      this.router.navigateByUrl('/login');
    });
  }
}
