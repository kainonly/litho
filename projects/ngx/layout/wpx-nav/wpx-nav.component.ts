import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';

import { WpxPageNode } from '../types';
import { WpxLayoutService } from '../wpx-layout.service';

@Component({
  selector: 'wpx-nav',
  templateUrl: './wpx-nav.component.html'
})
export class WpxNavComponent {
  @Input() theme: NzMenuThemeType = 'light';

  constructor(public wpxLayout: WpxLayoutService, private router: Router) {}

  open(node: WpxPageNode): void {
    if (node.router.template === 'manual') {
      this.router.navigate(node.fragments);
    } else {
      this.router.navigate([
        'pages',
        {
          fragments: node.fragments
        }
      ]);
    }
  }
}
