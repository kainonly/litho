import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-page',
  template: `<span>Page</span>`
})
export class PageComponent implements OnInit {
  constructor(public bit: BitService) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
  }
}
