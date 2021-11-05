import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { WpxService } from '@weplanx/components';

import { CommonService } from './common.service';
import { WpxTemplateTableComponent } from './wpx-template-table/wpx-template-table.component';

@Component({
  selector: 'wpx-dynamic',
  template: '<ng-container *cdkPortalOutlet="component"></ng-container>'
})
export class WpxTemplateComponent implements OnInit {
  component!: ComponentPortal<unknown>;

  constructor(private wpx: WpxService, private route: ActivatedRoute, private common: CommonService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(map(v => v.get('fragments'))).subscribe(fragments => {
      this.initialize(fragments!);
    });
  }

  private initialize(fragments: string): void {
    this.wpx.paths.subscribe(v => {
      if (!v.size) {
        return;
      }
      const page = v.get(fragments.replace(',', '/'))!;
      this.common.setTemplate(page.router!, page.option!);
      switch (page.router) {
        case 'table':
          this.component = new ComponentPortal(WpxTemplateTableComponent);
          break;
      }
    });
  }
}
