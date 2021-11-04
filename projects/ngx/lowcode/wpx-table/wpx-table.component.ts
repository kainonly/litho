import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchOption, WpxCollection } from '@weplanx/ngx';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'wpx-table',
  templateUrl: './wpx-table.component.html',
  styleUrls: ['./wpx-table.component.scss']
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

  keywords: Set<string> = new Set();

  customWidth = false;
  customWidthMessageId?: string;

  searchForm?: FormGroup;
  searchVisible = false;

  constructor(private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit(): void {
    this.coll.fields.forEach(v => {
      if (!!v.keyword) {
        this.keywords.add(v.key);
      }
    });
  }

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

  submitSearch(data?: unknown): void {
    if (!!data) {
      this.coll.searchText = '';
      this.coll.searchOptions = data as Record<string, SearchOption>;
    } else {
      this.coll.searchOptions = {};
    }
    this.coll.updateStorage();
    this.fetch.emit(true);
  }

  resetSearch(): void {
    const data: any = {};
    for (const x of this.coll.columns) {
      data[x.value] = {
        operator: '$regex',
        value: ''
      };
    }
    this.searchForm?.patchValue(data);
  }

  clearSearch(): void {
    this.coll.searchText = '';
    this.coll.searchOptions = {};
    this.fetch.emit(true);
  }

  onMessage(): void {
    if (this.customWidth) {
      this.customWidthMessageId = this.message.create('info', '您正在自定义列宽度，该状态不能进行字段排序', {
        nzDuration: 0
      }).messageId;
    } else {
      this.message.remove(this.customWidthMessageId);
    }
  }

  resize({ width }: NzResizeEvent, value: string): void {
    this.coll.columnsWidth[value] = `${width}px`;
    this.coll.updateStorage();
  }
}
