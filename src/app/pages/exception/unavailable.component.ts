import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-exception-500',
  template: `
    <bit-ph skip></bit-ph>
    <nz-result nzStatus="500" nzTitle="500" [nzSubTitle]="bit.l['unavailable']">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">
          {{ bit.l['home'] }}
        </button>
      </div>
    </nz-result>
  `
})
export class UnavailableComponent implements OnInit {
  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
  }
}
