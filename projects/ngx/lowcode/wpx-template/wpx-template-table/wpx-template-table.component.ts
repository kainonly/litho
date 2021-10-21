import { Component, Input } from '@angular/core';

import { WpxListByPage } from '@weplanx/ngx';

import { Field } from '../../wpx-schema/types';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html'
})
export class WpxTemplateTableComponent {
  @Input() fields: Field[] = [];
  @Input() lists!: WpxListByPage;
}
