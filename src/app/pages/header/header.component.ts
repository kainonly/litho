import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public app: AppService, public wpx: WpxService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.app.logout().subscribe(async () => {
      this.app.user = undefined;
      await this.router.navigateByUrl('/login');
    });
  }
}
