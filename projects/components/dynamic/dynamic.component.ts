import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { WpxService } from '@weplanx/common';

import { DynamicService } from './dynamic.service';

@Component({
  selector: 'wpx-dynamic',
  template: '<ng-container *cdkPortalOutlet="component"></ng-container>'
})
export class WpxDynamicComponent implements OnInit {
  component!: ComponentPortal<any>;

  constructor(private wpx: WpxService, private route: ActivatedRoute, private dynamic: DynamicService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(map(v => v.get('pageId'))).subscribe(id => {
      // this.initialize(id!);
    });
  }

  private initialize(id: string): void {}
}
