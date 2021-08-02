import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-exception-404',
  template: `
    <bit-ph skip></bit-ph>
    <nz-result nzStatus="404" nzTitle="404" [nzSubTitle]="bit.l['notFound']">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">
          {{ bit.l['home'] }}
        </button>
      </div>
    </nz-result>
  `
})
export class NotFoundComponent implements OnInit {
  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
  }
}
