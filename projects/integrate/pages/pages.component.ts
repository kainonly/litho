import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { WpxService } from '@weplanx/common';

import { FormComponent } from './form/form.component';
import { PagesService } from './pages.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'wpx-pages',
  template: `
    <ng-container *ngIf="component">
      <ng-container *cdkPortalOutlet="component"></ng-container>
    </ng-container>
  `
})
export class WpxPagesComponent implements OnInit {
  component?: ComponentPortal<any>;

  constructor(private wpx: WpxService, private route: ActivatedRoute, private dynamic: PagesService) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(v => v.get('pageId')!),
        switchMap(id => this.dynamic.pages(id))
      )
      .subscribe(page => {
        switch (page.kind) {
          case 'form':
            this.component = new ComponentPortal<any>(FormComponent);
            break;
          default:
            this.component = new ComponentPortal<any>(TableComponent);
        }
      });
  }
}
