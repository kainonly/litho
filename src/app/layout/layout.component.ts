import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { BitService } from 'ngx-bit';
import { BitRouterService } from 'ngx-bit/router';

import packer from './language';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(public bit: BitService, public app: AppService, public router: BitRouterService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.app.resources().subscribe(data => {
      this.router.resources = data;
    });
  }
}
