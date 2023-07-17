import { Component, Input, ViewChild } from '@angular/core';

import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';

import { ColumnsType } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html'
})
export class WpxTableComponent<T> {
  @ViewChild('tb', { static: false }) tb?: NzTableComponent<T>;
  @Input({ required: true }) wpxColumns!: ColumnsType<T>[];
  @Input({ required: true }) wpxData!: Array<T>;

  change(v: NzTableQueryParams): void {
    console.log(v);
  }
}
