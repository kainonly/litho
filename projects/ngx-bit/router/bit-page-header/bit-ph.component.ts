import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';

import { BitRouterService } from 'ngx-bit/router';

import { BitPhActionDirective } from './bit-ph-action.directive';

@Component({
  selector: 'bit-ph',
  template: ``
})
export class BitPhComponent implements OnInit {
  @Input() subTitle?: string | Record<string, string>;
  @ContentChildren(BitPhActionDirective) actions?: QueryList<BitPhActionDirective>;

  constructor(private router: BitRouterService) {}

  ngOnInit(): void {
    this.router.ph.next({
      subTitle: this.subTitle
    });
  }
}
