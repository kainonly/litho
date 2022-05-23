import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { WpxService } from '@weplanx/ng';

import { DynamicService } from './dynamic.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'wpx-dynamic',
  template: `
    <ng-container *ngIf="component">
      <ng-container *cdkPortalOutlet="component"></ng-container>
    </ng-container>
  `
})
export class DynamicComponent implements OnInit {
  component?: ComponentPortal<any>;

  constructor(private wpx: WpxService, private route: ActivatedRoute, private dynamic: DynamicService) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(v => v.get('pageId')!),
        switchMap(id => this.dynamic.pages(id))
      )
      .subscribe(page => {
        switch (page.kind) {
          // case 'form':
          //   this.component = new ComponentPortal<any>(FormComponent);
          //   break;
          default:
            this.component = new ComponentPortal<any>(TableComponent);
        }
      });
  }
}
