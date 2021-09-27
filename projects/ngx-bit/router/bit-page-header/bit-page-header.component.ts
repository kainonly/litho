import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BitRouterService, PageStruct } from 'ngx-bit/router';

@Component({
  selector: 'bit-page-header',
  templateUrl: './bit-page-header.component.html'
})
export class BitPageHeaderComponent implements OnInit {
  dict!: Record<string, PageStruct>;

  constructor(public router: BitRouterService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.pages.subscribe(result => {
      this.dict = result.dict;
    });
  }
}
