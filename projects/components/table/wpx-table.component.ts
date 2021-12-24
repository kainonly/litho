import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchOption, Dataset } from '@weplanx/components';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'wpx-table',
  templateUrl: './wpx-table.component.html',
  styleUrls: ['./wpx-table.component.scss']
})
export class WpxTableComponent implements OnInit {
  @Input() ds!: Dataset<any>;
  @Input() scroll: { x?: string | null; y?: string | null } = { x: '1600px' };
  @Input() actions?: TemplateRef<any>;
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
    this.ds.fields.forEach(v => {
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
    for (const x of this.ds.columns) {
      controls[x.value] = this.fb.group({
        operator: ['$regex'],
        value: []
      });
    }
    this.searchForm = this.fb.group(controls);
    this.searchForm.patchValue(this.ds.searchOptions);
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
      this.ds.searchText = '';
      this.ds.searchOptions = data as Record<string, SearchOption>;
    } else {
      this.ds.searchOptions = {};
    }
    this.ds.updateStorage();
    this.fetch.emit(true);
  }

  /**
   * 重置搜索
   */
  resetSearch(): void {
    const data: any = {};
    for (const x of this.ds.columns) {
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
    this.ds.searchText = '';
    this.ds.searchOptions = {};
    this.fetch.emit(true);
  }

  /**
   * 自定义列宽
   */
  resize({ width }: NzResizeEvent, value: string): void {
    this.ds.columnsWidth[value] = `${width}px`;
    this.ds.updateStorage();
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
