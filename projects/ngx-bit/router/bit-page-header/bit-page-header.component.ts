import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';
import { BitRouterService, ID, Resource } from 'ngx-bit/router';

@Component({
  selector: 'bit-page-header',
  templateUrl: './bit-page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitPageHeaderComponent implements OnInit {
  data!: Record<ID, Resource>;
  dict!: Record<string, ID>;

  constructor(public bit: BitService, public router: BitRouterService) {}

  ngOnInit(): void {
    this.data = this.router.resources.data;
    this.dict = this.router.resources.dict;
  }
}
