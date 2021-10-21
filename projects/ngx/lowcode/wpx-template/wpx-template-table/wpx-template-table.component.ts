import { Component, Input } from '@angular/core';

import { WpxListByPage } from '@weplanx/ngx';
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

import { Field } from '../../wpx-schema/types';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html',
  styleUrls: ['./wpx-template-table.component.scss']
})
export class WpxTemplateTableComponent {
  @Input() fields!: Field[];
  @Input() lists!: WpxListByPage;

  size: NzTableSize = 'middle';
}
