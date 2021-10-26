import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { WpxListByPage } from '@weplanx/ngx';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

import { Field } from '../../wpx-schema/types';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html',
  styleUrls: ['./wpx-template-table.component.scss']
})
export class WpxTemplateTableComponent implements OnChanges {
  @Input() fields!: Field[];
  @Input() lists!: WpxListByPage;
  @Output() readonly refresh: EventEmitter<void> = new EventEmitter<void>();

  size: NzTableSize = 'middle';
  columnsChecked = true;
  columnsIndeterminate = false;
  columns: NzCheckBoxOptionInterface[] = [];
  displayColumns: NzCheckBoxOptionInterface[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('fields')) {
      this.columns = [
        ...(changes.fields.currentValue as Field[]).map(
          v => <NzCheckBoxOptionInterface>{ label: v.label, value: v.key, checked: true }
        )
      ];
      this.displayColumns = this.columns;
    }
  }

  updateColumnsChecked(): void {
    this.columnsIndeterminate = false;
    this.columns.forEach(v => {
      v.checked = this.columnsChecked;
    });
    this.displayColumns = [...this.columns.filter(v => v.checked)];
  }

  updateColumnChecked(): void {
    this.columnsChecked = this.columns.every(v => v.checked);
    this.columnsIndeterminate = !this.columnsChecked && this.columns.some(v => v.checked);
    this.displayColumns = [...this.columns.filter(v => v.checked)];
  }
}
