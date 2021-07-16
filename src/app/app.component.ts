import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(import('./app-language'));
  }
}
