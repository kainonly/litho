import { Component, Input, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

@Component({
  selector: 'bit-ph',
  exportAs: 'bitPageHeader',
  template: ``
})
export class BitPageHeaderComponent implements OnInit {
  @Input() subTitle?: string;

  constructor(private bit: BitService) {}

  ngOnInit(): void {
    this.bit.ph = {
      subTitle: this.subTitle
    };
  }
}
