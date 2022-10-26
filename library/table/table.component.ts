import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { WpxData, WpxApi, AnyDto } from '@weplanx/ng';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

import { WpxTableService } from './table.service';
import { Search, TableField, TableOption } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class WpxTableComponent<T> implements OnInit {
  /**
   * 唯一命名
   */
  @Input() wpxKey!: string;
  /**
   * 通用请求
   */
  @Input() wpxApi!: WpxApi<T>;
  /**
   * 通用数据
   */
  @Input() wpxData!: WpxData<AnyDto<T>>;
  /**
   * 字段设置
   */
  @Input() wpxFields!: Map<string, TableField>;
  /**
   * 滚动区域宽高
   */
  @Input() wpxScroll: { x?: string | null; y?: string | null } = { x: '1600px' };
  /**
   * 定义行操作
   */
  @Input() wpxActions?: TemplateRef<any>;
  /**
   * 定义批量操作
   */
  @Input() wpxBulk?: TemplateRef<any>;
  /**
   * 排除字段
   */
  @Input() wpxOmit: string[] = [];
  /**
   * 搜索模板 Ref
   */
  @ViewChild('searchRef', { static: true }) wpxSearch!: TemplateRef<any>;
  /**
   * 表格排序
   */
  sort: Record<string, NzTableSortOrder> = {};
  /**
   * 关键词集合
   */
  keywords: Set<string> = new Set<string>();
  /**
   * 关键词搜索
   */
  searchText = '';
  /**
   * 查询表单
   */
  searchForm?: UntypedFormGroup;
  /**
   * 查询显示
   */
  searchVisible = false;
  /**
   * 列
   */
  columns: NzCheckBoxOptionInterface[] = [];
  /**
   * 显示列
   */
  columnsDisplay: NzCheckBoxOptionInterface[] = [];
  /**
   * 显示全部列
   */
  columnsChecked = true;
  /**
   * 显示部分列
   */
  columnsIndeterminate = false;
  /**
   * 自定义宽
   */
  columnsWidth: Record<string, string> = {};
  /**
   * 自定义宽显示
   */
  columnsWidthVisible = false;
  /**
   * 自定义宽提示Id
   */
  columnsWidthMessageId?: string;
  /**
   * 枚举字典
   */
  enums: Record<string, any> = {};
  /**
   * 引用请求
   */
  requests: Record<string, (ids: string[]) => Observable<any>> = {};
  /**
   * 引用字典
   */
  references: Record<string, any> = {};

  constructor(private service: WpxTableService, private fb: UntypedFormBuilder, private message: NzMessageService) {}

  ngOnInit(): void {
    const columns: NzCheckBoxOptionInterface[] = [];
    const columnsWidth: Record<string, string> = {};
    for (const [key, value] of this.wpxFields.entries()) {
      /**
       * 初始化关键词集合
       */
      if (!!value.keyword) {
        this.keywords.add(key);
      }
      /**
       * 初始化枚举字典
       */
      if (value.type === 'select') {
        const values = value.option?.values ?? [];
        this.enums[key] = Object.fromEntries(values.map(v => [v.value, v.label]));
      }
      /**
       * 初始化引用请求
       */
      if (value.type === 'ref') {
        const { reference, target } = value.option!;
        this.requests[key] = (ids: string[]) => this.service.references(reference!, ids, target!);
      }
      /**
       * 初始化列样式
       */
      columns.push({ label: value.label, value: key, checked: true });
      columnsWidth[key] = '240px';
    }
    this.columns = columns;

    const raw = sessionStorage.getItem(this.wpxKey);
    /**
     * 本地存储样式合并
     */
    if (raw) {
      const v = JSON.parse(raw) as TableOption<T>;
      this.searchText = v.searchText;
      this.wpxData.filter = v.filter;
      this.wpxData.sort = v.sort;
      this.wpxData.page = v.page;
      this.wpxData.pagesize = v.pagesize;
      if (
        v.columns.length === this.wpxFields.size &&
        v.columns.every(v => this.wpxFields.has(v.value) && this.wpxFields.get(v.value)!.label === v.label)
      ) {
        this.columns = v.columns;
      } else {
        this.columnsChecked = true;
        this.columnsIndeterminate = false;
        this.columns = columns;
      }
      this.columnsWidth = v.columnsWidth;
    } else {
      this.columns = columns;
      this.columnsWidth = columnsWidth;
    }

    this.updateColumnChecked();
    this.getData();
  }

  /**
   * 获取数据
   * @param refresh
   */
  getData(refresh = false): void {
    for (const [key, value] of Object.entries(this.sort)) {
      switch (value) {
        case 'ascend':
          Reflect.set(this.wpxData.sort, key, 1);
          break;
        case 'descend':
          Reflect.set(this.wpxData.sort, key, -1);
          break;
        default:
          delete this.wpxData.sort[key];
      }
    }
    this.wpxApi.pages(this.wpxData, refresh).subscribe(data => {
      for (const [key, request] of Object.entries(this.requests)) {
        const ids = [...new Set([].concat(...data.map(v => v[key])))].filter(v => !!v);
        request(ids).subscribe(refs => {
          this.references[key] = refs;
        });
      }
      this.updateStorage();
    });
  }

  /**
   * 打开搜索表单
   */
  openSearchForm(): void {
    const controls: Record<string, UntypedFormGroup> = {};
    for (const x of this.columns) {
      controls[x.value] = this.fb.group({
        operator: ['$regex'],
        value: []
      });
    }
    this.searchForm = this.fb.group(controls);
    this.searchForm.patchValue(this.wpxData.filter!);
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
  submitSearch(data?: Record<string, Search>): void {
    if (!data) {
      for (const key of Object.keys(this.wpxData.filter)) {
        if (!this.wpxOmit.includes(key)) {
          delete this.wpxData.filter[key];
        }
      }
      const keywords = [...this.keywords.values()];
      if (keywords.length === 0) {
        this.message.warning('尚未设置搜索关键词');
        return;
      }
      Reflect.set(
        this.wpxData.filter,
        '$or',
        keywords.map(v => ({ [v]: { $regex: this.searchText } }))
      );
    } else {
      for (const [key, search] of Object.entries(data)) {
        if (search.value) {
          Reflect.set(this.wpxData.filter, key, { [search.operator]: search.value });
        }
      }
    }
    this.updateStorage();
    this.getData(true);
  }

  /**
   * 重置搜索
   */
  resetSearch(): void {
    const data: Record<string, any> = {};
    for (const x of this.columns) {
      data[x.value] = {
        operator: '$regex',
        value: ''
      };
    }
    this.searchForm?.patchValue(data);
    this.clearSearch();
  }

  /**
   * 清除搜索
   */
  clearSearch(): void {
    this.searchText = '';
    for (const key of Object.keys(this.wpxData.filter)) {
      if (!this.wpxOmit.includes(key)) {
        delete this.wpxData.filter[key];
      }
    }
    this.getData(true);
  }

  /**
   * 自定义列宽
   */
  resize({ width }: NzResizeEvent, value: string): void {
    this.columnsWidth[value] = `${width}px`;
    this.updateStorage();
  }

  /**
   * 自定义列宽提示
   */
  onResizeMessage(): void {
    if (this.columnsWidthVisible) {
      this.columnsWidthMessageId = this.message.create('info', '您正在自定义列宽度，该状态不能进行字段排序', {
        nzDuration: 0
      }).messageId;
    } else {
      this.message.remove(this.columnsWidthMessageId);
    }
  }

  /**
   * 更新显示列
   */
  updateDisplayColumns(): void {
    this.columnsDisplay = [...this.columns.filter(v => v.checked)];
  }

  /**
   * 更新列设置全部选中状态
   */
  updateColumnsChecked(): void {
    this.columnsIndeterminate = false;
    this.columns.forEach(v => {
      v.checked = this.columnsChecked;
    });
    this.updateDisplayColumns();
  }

  /**
   * 更新列设置选中状态
   */
  updateColumnChecked(): void {
    this.columnsChecked = this.columns.every(v => v.checked);
    this.columnsIndeterminate = !this.columnsChecked && this.columns.some(v => v.checked);
    this.updateDisplayColumns();
    this.updateStorage();
  }

  /**
   * 列设置重置
   */
  columnsReset(): void {
    this.columnsWidth = {};
    this.columnsChecked = true;
    this.updateColumnsChecked();
    this.updateStorage();
  }

  /**
   * 更新本地存储
   */
  updateStorage(): void {
    sessionStorage.setItem(
      this.wpxKey,
      JSON.stringify(<TableOption<T>>{
        searchText: this.searchText,
        filter: this.wpxData.filter,
        sort: this.wpxData.sort,
        pagesize: this.wpxData.pagesize,
        page: this.wpxData.page,
        columns: this.columns,
        columnsWidth: this.columnsWidth
      })
    );
  }

  /**
   * 样式修复
   */
  repair(): void {
    sessionStorage.removeItem(this.wpxKey);
    this.ngOnInit();
    this.message.success('同步修复已完成');
  }
}
