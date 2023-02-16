import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconService } from 'ng-zorro-antd/icon';

import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(
    private wpx: WpxService,
    public app: AppService,
    private router: Router,
    private drawer: NzDrawerService,
    private nzIconService: NzIconService
  ) {}

  ngOnInit(): void {
    this.app.ping().subscribe(_ => {});
    this.nzIconService.changeAssetsSource(environment.cdn);
    this.wpx.setAssets(environment.cdn);
  }

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
