import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BitRouterService, ResourceStruct } from 'ngx-bit/router';

@Component({
  selector: 'bit-page-header',
  templateUrl: './bit-page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitPageHeaderComponent implements OnInit {
  dict!: Record<string, ResourceStruct>;

  constructor(public router: BitRouterService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.resources.subscribe(result => {
      this.dict = result.dict;
      this.cd.detectChanges();
    });
  }
}
