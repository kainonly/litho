import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BitRouterService, ID, Resource } from 'ngx-bit/router';

@Component({
  selector: 'bit-page-header',
  templateUrl: './bit-page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitPageHeaderComponent implements OnInit {
  data!: Record<ID, Resource>;
  dict!: Record<string, ID>;

  constructor(public router: BitRouterService) {}

  ngOnInit(): void {
    this.router.resources.subscribe(result => {
      this.data = result.data;
      this.dict = result.dict;
    });
  }
}
