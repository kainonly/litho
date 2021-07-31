import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { BitRouterService, PageHeader } from 'ngx-bit/router';

@Component({
  selector: 'bit-ph',
  template: ``
})
export class PageHeaderMixedComponent implements OnInit {
  @Input() subTitle?: string | Record<string, string>;

  constructor(private router: BitRouterService) {}

  ngOnInit(): void {
    this.router.ph.next({
      subTitle: this.subTitle
    });
  }
}
