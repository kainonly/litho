import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconService } from 'ng-zorro-antd/icon';

import { ProfileComponent } from './profile/profile.component';
import { QuickComponent } from './quick/quick.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();

  @ViewChild('quickTitleTpl') quickTitleTpl!: TemplateRef<any>;
  private quickRef?: NzDrawerRef;

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
