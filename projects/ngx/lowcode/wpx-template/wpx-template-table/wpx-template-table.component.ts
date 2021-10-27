import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  private fieldsMap: Map<string, Field> = new Map<string, Field>();

  searchOptions: NzCheckBoxOptionInterface[] = [];

  search: Field[] = [];
  searchForm?: FormGroup;
  searchOperate: any = {};

  size: NzTableSize = 'middle';

  columnsChecked = true;
  columnsIndeterminate = false;
  columns: NzCheckBoxOptionInterface[] = [];
  displayColumns: NzCheckBoxOptionInterface[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('fields')) {
      this.search = [];
      this.searchForm = undefined;
      this.searchOperate = {};
      this.fieldsMap = new Map<string, Field>((changes.fields.currentValue as Field[]).map(v => [v.key, v]));
      this.searchOptions = [
        ...(changes.fields.currentValue as Field[])
          .filter(v => !['media'].includes(v.type))
          .map(v => <NzCheckBoxOptionInterface>{ label: v.label, value: v.key })
      ];
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

  updateSearch(): void {
    const controls: any = {};
    this.search = this.searchOptions
      .filter(v => v.checked)
      .map(v => {
        const field = this.fieldsMap.get(v.value)!;
        controls[field.key] = this.fb.group({
          operator: ['$eq'],
          value: []
        });
        return field;
      });
    this.searchForm = this.fb.group(controls);
  }

  submit(data: any): void {
    console.log(data);
  }
}
