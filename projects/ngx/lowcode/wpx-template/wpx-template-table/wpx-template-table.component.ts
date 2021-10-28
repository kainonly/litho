import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxListByPage, WpxService } from '@weplanx/ngx';
import { WpxTemplateService } from '@weplanx/ngx/lowcode';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

import { Field } from '../../wpx-schema/types';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html',
  styleUrls: ['./wpx-template-table.component.scss']
})
export class WpxTemplateTableComponent implements OnInit, OnChanges {
  @Input() fields!: Field[];
  lists!: WpxListByPage;

  search: Field[] = [];
  searchQuick: any = {
    field: '',
    value: ''
  };
  searchAdvancedVisible = false;
  searchAdvancedForm?: FormGroup;

  size: NzTableSize = 'middle';

  columnsChecked = true;
  columnsIndeterminate = false;
  columns: NzCheckBoxOptionInterface[] = [];
  displayColumns: NzCheckBoxOptionInterface[] = [];

  constructor(private wpx: WpxService, private template: WpxTemplateService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.lists = this.wpx.createListByPage({
      id: `asd`
    });
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('fields')) {
      console.log(changes);
      console.log(changes.fields.currentValue);
      this.search = [...(changes.fields.currentValue as Field[]).filter(v => !['media'].includes(v.type))];
      this.searchQuick = {
        field: this.search[0]?.key,
        value: ''
      };
      this.columns = [
        ...(changes.fields.currentValue as Field[]).map(
          v => <NzCheckBoxOptionInterface>{ label: v.label, value: v.key, checked: true }
        )
      ];
      this.displayColumns = this.columns;
    }
  }

  getData(): void {
    this.template.api.findByPage(this.lists!, true, true).subscribe(data => {
      this.lists?.setData(data as any[]);
    });
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

  quickSearch(): void {
    console.log(this.searchQuick);
  }

  openSearchAdvanced(): void {
    this.searchAdvancedVisible = true;
    const controls: any = {};
    for (const x of this.search) {
      controls[x.key] = this.fb.group({
        operator: [],
        value: []
      });
    }
    this.searchAdvancedForm = this.fb.group(controls);
  }

  closeSearchAdvanced(): void {
    this.searchAdvancedVisible = false;
    this.searchAdvancedForm = undefined;
  }

  submit(data: any): void {
    console.log(data);
  }
}
