import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private wpx: WpxService, public app: AppService, private router: Router) {}

  logout(): void {
    this.app.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
