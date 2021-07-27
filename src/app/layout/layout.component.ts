import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  navs: any[] = [];
  collapsed = false;
  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
  }
}
