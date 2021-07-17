import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

@Component({
  selector: 'bit-i18n-btn',
  templateUrl: './bit-i18n-btn.component.html'
})
export class BitI18nBtnComponent implements OnInit {
  i18nVisable = false;

  constructor(private bit: BitService) {}

  ngOnInit(): void {}

  open(): void {
    this.i18nVisable = true;
  }

  close(): void {
    this.i18nVisable = false;
  }
}
