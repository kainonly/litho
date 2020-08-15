import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-empty',
  template: `
    <nz-result nzStatus="403" nzTitle="403" [nzSubTitle]="bit.l['tips']">
      <div nz-result-extra>
        <button nz-button
                nzType="primary"
                routerLink="/">
          {{bit.l['home']}}
        </button>
      </div>
    </nz-result>
  `
})
export class EmptyComponent implements OnInit {
  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
  }
}
