import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxCollection } from '@weplanx/ngx';
import { Field } from '@weplanx/ngx/lowcode';

@Component({
  selector: 'wpx-table',
  templateUrl: './wpx-table.component.html'
})
export class WpxTableComponent implements OnInit {
  @Input() coll!: WpxCollection<any>;
  @Input() scroll: {
    x?: string | null;
    y?: string | null;
  } = { x: '1600px' };
  @Output() readonly fetch: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('searchbox', { static: true }) searchbox!: TemplateRef<any>;
  @ViewChild('toolbox', { static: true }) toolbox!: TemplateRef<any>;

  search: Field[] = [];
  searchQuick: any = {
    field: '',
    value: ''
  };
  searchAdvancedVisible = false;
  searchAdvancedForm?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

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
