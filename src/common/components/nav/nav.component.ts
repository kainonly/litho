import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/components/nav/profile/profile.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  @Input() type?: string;

  constructor(
    public app: AppService,
    private drawer: NzDrawerService,
    private router: Router
  ) {}

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzWidth: 720,
      nzContent: ProfileComponent,
      nzClosable: false
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user.set(null);
      this.router.navigateByUrl('/login');
    });
  }
}
