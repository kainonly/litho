import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxCollection, WpxService } from '@weplanx/ngx';
import { WpxTemplateService } from '@weplanx/ngx/lowcode';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { Field } from '../../wpx-schema/types';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html',
  styleUrls: ['./wpx-template-table.component.scss']
})
export class WpxTemplateTableComponent implements OnInit {
  coll!: WpxCollection<any>;

  search: Field[] = [];
  searchQuick: any = {
    field: '',
    value: ''
  };
  searchAdvancedVisible = false;
  searchAdvancedForm?: FormGroup;

  columnsChecked = true;
  columnsIndeterminate = false;
  columns: NzCheckBoxOptionInterface[] = [];
  displayColumns: NzCheckBoxOptionInterface[] = [];

  constructor(private wpx: WpxService, public template: WpxTemplateService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.template.fields.subscribe(v => {
      this.search = [...v.filter(v => !['media'].includes(v.type))];
      this.searchQuick = {
        field: '',
        value: ''
      };
      this.columns = [...v.map(v => <NzCheckBoxOptionInterface>{ label: v.label, value: v.key, checked: true })];
      this.displayColumns = this.columns;
    });
    // this.coll = this.wpx.collection(this.template.option!.schema);
    this.getData();
  }

  getData(): void {
    // this.template.api.findByPage(this.lists!, true, true).subscribe(data => {
    //   this.lists?.setData(data as any[]);
    // });
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
        operator: ['$eq'],
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
