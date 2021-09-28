import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';
import { BitRouterService, PageStruct } from 'ngx-bit/router';

@Component({
  selector: 'bit-sider-menu',
  templateUrl: './bit-sider-menu.component.html'
})
export class BitSiderMenuComponent {
  @Input() theme: NzMenuThemeType = 'light';

  constructor(public bitRouter: BitRouterService, private router: Router) {}

  open(page: PageStruct): void {
    if (page.router.template === 'manual') {
      this.router.navigate(page.fragments);
    } else {
      this.router.navigate([
        'pages',
        {
          fragments: page.fragments
        }
      ]);
    }
  }
}
