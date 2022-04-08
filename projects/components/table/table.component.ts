import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Data, Api, AnyDto, Where } from '@weplanx/common';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

import { WpxTableService } from './table.service';
import { Search, TableField, TableOption } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class WpxTableComponent<T> implements OnInit {
  @Input() wpxKey!: string;
  @Input() wpxApi!: Api<T>;
  @Input() wpxFields!: Map<string, TableField>;
  @Input() wpxScroll: { x?: string | null; y?: string | null } = { x: '1600px' };
  @Input() wpxActions?: TemplateRef<any>;
  @Input() wpxBulk?: TemplateRef<any>;
  @Input() wpxOmit: string[] = [];
  @ViewChild('searchRef', { static: true }) wpxSearch!: TemplateRef<any>;
  /**
   * 数据源
   */
  ds: Data<AnyDto<T>> = new Data<AnyDto<T>>();
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
  searchForm?: FormGroup;
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
   * 关联请求
   */
  requests: Record<string, (ids: string[]) => Observable<any>> = {};
  /**
   * 关联数据
   */
  references: Record<string, any> = {};

  constructor(
    private service: WpxTableService,
    private storage: StorageMap,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.storage.get(this.wpxKey).subscribe(data => {
      const columns: NzCheckBoxOptionInterface[] = [];
      const columnsWidth: Record<string, string> = {};
      for (const [key, value] of this.wpxFields.entries()) {
        if (!!value.keyword) {
          this.keywords.add(key);
        }
        if (value.option?.reference) {
          const { reference, target } = value.option;
          this.requests[reference] = (ids: string[]) => this.service.references(reference, ids, target ?? 'name');
        }
        columns.push({ label: value.label, value: key, checked: true });
        columnsWidth[key] = '240px';
      }
      if (data) {
        const v = data as TableOption;
        this.ds.pageSize = v.pageSize;
        this.ds.pageIndex = v.pageIndex;
        this.ds.where = v.where;
        this.ds.sort = v.sort;
        this.searchText = v.searchText;
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
    });
  }

  /**
   * 获取数据
   * @param refresh
   */
  getData(refresh = false): void {
    this.ds
      .from(this.wpxApi, refresh)
      .pipe(
        map(v => {
          for (const [key, request] of Object.entries(this.requests)) {
            request([...new Set([].concat(...v.map(v => v[key])))]).subscribe(data => {
              const dict: any = {};
              for (const x of data) {
                dict[x._id] = x;
              }
              this.references[key] = dict;
            });
          }
          return v;
        })
      )
      .subscribe(() => {
        this.updateStorage();
      });
  }

  /**
   * 打开搜索表单
   */
  openSearchForm(): void {
    const controls: Record<string, FormGroup> = {};
    for (const x of this.columns) {
      controls[x.value] = this.fb.group({
        operator: ['$regex'],
        value: []
      });
    }
    this.searchForm = this.fb.group(controls);
    this.searchForm.patchValue(this.ds.where!);
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
      for (const key of Object.keys(this.ds.where)) {
        if (!this.wpxOmit.includes(key)) {
          delete this.ds.where[key];
        }
      }
      Reflect.set(
        this.ds.where,
        '$or',
        [...this.keywords.values()].map(v => ({ [v]: { $regex: this.searchText } }))
      );
    } else {
      for (const [key, search] of Object.entries(data)) {
        if (search.value) {
          Reflect.set(this.ds.where, key, { [search.operator]: search.value });
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
    const data: any = {};
    for (const x of this.columns) {
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
    this.searchText = '';
    for (const key of Object.keys(this.ds.where)) {
      if (!this.wpxOmit.includes(key)) {
        delete this.ds.where[key];
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
    this.storage
      .set(this.wpxKey, <TableOption>{
        pageSize: this.ds.pageSize,
        pageIndex: this.ds.pageIndex,
        searchText: this.searchText,
        where: this.ds.where,
        sort: this.ds.sort,
        columns: this.columns,
        columnsWidth: this.columnsWidth
      })
      .subscribe(() => {});
  }

  repair(): void {
    this.storage.delete(this.wpxKey).subscribe(() => {
      this.ngOnInit();
    });
  }
}
