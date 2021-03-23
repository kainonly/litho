import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  template: `<span>{{ key }}</span>`
})
export class PageComponent implements OnInit {
  key: string;

  constructor(
    public bit: BitService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.route.params.subscribe(data => {
      this.key = data.key;
    });
  }
}
