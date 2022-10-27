import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() breadcrumb!: TemplateRef<any>;

  constructor(public app: AppService, private router: Router) {}

  ngOnInit(): void {
    console.log();
  }

  /**
   * 注销登录
   */
  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }
}
