import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';
import { BitRouterService } from 'ngx-bit/router';

import { Resource } from '../types';

@Component({
  selector: 'bit-sider-menu',
  templateUrl: './bit-sider-menu.component.html',
  styleUrls: ['./bit-sider-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitSiderMenuComponent implements OnInit {
  @Input() theme: NzMenuThemeType = 'light';
  navs: Resource[] = [];

  constructor(public router: BitRouterService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.resources.subscribe(result => {
      this.navs = result.navs;
      this.cd.detectChanges();
    });
  }
}
