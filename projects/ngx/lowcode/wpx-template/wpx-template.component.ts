import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { WpxService } from '@weplanx/ngx';
import { PageOption, WpxLayoutService } from '@weplanx/ngx/layout';

import { Field, Schema } from '../wpx-schema/types';
import { WpxSchemaService } from '../wpx-schema/wpx-schema.service';
import { WpxTemplateService } from './wpx-template.service';

@Component({
  selector: 'wpx-template',
  template: `
    <ng-container [ngSwitch]="template.router">
      <ng-container *ngSwitchCase="'table'">
        <wpx-template-table></wpx-template-table>
      </ng-container>
    </ng-container>
  `
})
export class WpxTemplateComponent implements OnInit {
  constructor(private wpx: WpxService, private route: ActivatedRoute, public template: WpxTemplateService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(map(v => v.get('fragments'))).subscribe(fragments => {
      this.template.setTemplate(fragments!);
    });
  }
}
