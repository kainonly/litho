import {Component, OnInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';
import packer from './app.language';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer, true);
  }
}
