import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { BitRouterService } from 'ngx-bit/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(public app: AppService, public router: BitRouterService) {}

  ngOnInit(): void {
    this.app.resources().subscribe(data => {
      this.router.resources = data;
    });
  }
}
