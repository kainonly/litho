import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { timeout } from 'rxjs/operators';

import { SearchOption, Collection } from '@weplanx/components';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'wpx-table',
  templateUrl: './wpx-table.component.html',
  styleUrls: ['./wpx-table.component.scss']
})
export class WpxTableComponent implements OnInit {
  @Input() coll!: Collection<any>;
  @Input() scroll: { x?: string | null; y?: string | null } = { x: '1600px' };
  @Output() readonly fetch: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('searchbox', { static: true }) searchbox!: TemplateRef<any>;
  @ViewChild('toolbox', { static: true }) toolbox!: TemplateRef<any>;

  keywords: Set<string> = new Set();
  searchForm?: FormGroup;
  searchVisible = false;

  customWidth = false;
  customWidthMessageId?: string;

  constructor(private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit(): void {
    this.coll.fields.forEach(v => {
      if (!!v.keyword) {
        this.keywords.add(v.key);
      }
    });
  }

  /**
   * 打开搜索表单
   */
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

  /**
   * 关闭搜索表单
   */
  closeSearchForm(): void {
    this.searchVisible = false;
    this.searchForm = undefined;
  }

  /**
   * 提交搜索
   */
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

  /**
   * 重置搜索
   */
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

  /**
   * 清除搜索
   */
  clearSearch(): void {
    this.coll.searchText = '';
    this.coll.searchOptions = {};
    this.fetch.emit(true);
  }

  /**
   * 自定义列宽
   */
  resize({ width }: NzResizeEvent, value: string): void {
    this.coll.columnsWidth[value] = `${width}px`;
    this.coll.updateStorage();
  }

  /**
   * 自定义列宽提示
   */
  onResizeMessage(): void {
    if (this.customWidth) {
      this.customWidthMessageId = this.message.create('info', '您正在自定义列宽度，该状态不能进行字段排序', {
        nzDuration: 0
      }).messageId;
    } else {
      this.message.remove(this.customWidthMessageId);
    }
  }
}
