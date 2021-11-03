import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchOption, SearchValue, WpxCollection } from '@weplanx/ngx';

@Component({
  selector: 'wpx-table',
  templateUrl: './wpx-table.component.html'
})
export class WpxTableComponent {
  @Input() coll!: WpxCollection<any>;
  @Input() scroll: {
    x?: string | null;
    y?: string | null;
  } = { x: '1600px' };

  @Output() readonly fetch: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('searchbox', { static: true }) searchbox!: TemplateRef<any>;
  @ViewChild('toolbox', { static: true }) toolbox!: TemplateRef<any>;

  searchForm?: FormGroup;
  searchVisible = false;

  constructor(private fb: FormBuilder) {}

  openSearchForm(): void {
    const controls: Record<string, FormGroup> = {};
    for (const x of this.coll.columns) {
      controls[x.value] = this.fb.group({
        operator: ['$regex'],
        value: []
      });
    }
    this.searchForm = this.fb.group(controls);
    this.searchForm.patchValue(this.coll.searchOptions);
    this.searchVisible = true;
  }

  closeSearchForm(): void {
    this.searchVisible = false;
    this.searchForm = undefined;
  }

  searchSubmit(data?: unknown): void {
    if (!!data) {
      this.coll.searchText = '';
      this.coll.searchOptions = data as Record<string, SearchOption>;
    } else {
      this.coll.searchOptions = {};
    }
    this.coll.updateStorage();
    this.fetch.emit(true);
  }

  searchReset(): void {
    const data: any = {};
    for (const x of this.coll.columns) {
      data[x.value] = {
        operator: '$regex',
        value: ''
      };
    }
    this.searchForm?.patchValue(data);
  }

  searchClear(): void {
    this.coll.searchText = '';
    this.coll.searchOptions = {};
    this.fetch.emit(true);
  }
}
