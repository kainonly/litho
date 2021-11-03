import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { WpxService, WpxCollection } from '@weplanx/ngx';
import { Field } from '@weplanx/ngx/lowcode';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wpx: WpxService,
    private order: OrderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.coll = this.wpx.collection('order');
    this.coll.ready.subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false) {
    this.coll.from(this.order.api, refresh).subscribe(v => {});
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
}
