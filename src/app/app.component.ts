import { Component, OnInit } from '@angular/core';
import { BitConfigService, BitService } from 'ngx-bit';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService, private config: BitConfigService) {
  }

  ngOnInit(): void {
    this.config.setupLocales(import('./app.language'));
    this.config.setupHttpInterceptor(
      map(res => {
        return res;
      })
    );
  }
}
