import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-exception-403',
  template: `
    <nz-result nzStatus="403" nzTitle="403" [nzSubTitle]="bit.l['forbidden']">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">
          {{ bit.l['home'] }}
        </button>
      </div>
    </nz-result>
  `
})
export class ForbiddenComponent implements OnInit {
  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
  }
}
