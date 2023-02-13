import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/profile/profile.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  constructor(public app: AppService, private router: Router, private drawer: NzDrawerService) {}

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzTitle: 'Profile',
      nzWidth: '800px',
      nzContent: ProfileComponent,
      nzContentParams: {}
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }
}
