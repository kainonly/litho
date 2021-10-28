import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { APIResponse } from '@weplanx/ngx';
import { NzTreeNode } from 'ng-zorro-antd/tree';

import { Page } from './types';

@Injectable({
  providedIn: 'root'
})
export class WpxLayoutService {
  /**
   * 页面数据
   */
  readonly pages: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>([]);
  readonly paths: BehaviorSubject<Map<string, Page>> = new BehaviorSubject<Map<string, Page>>(new Map<string, Page>());
  /**
   * 当前路径
   */
  activated: string[] = [];
  /**
   * 是否忽略页头
   */
  skip = false;
  /**
   * 是否显示返回
   */
  back = false;
  /**
   * 页头标题
   */
  title?: string;
  /**
   * 页头全局提示区域
   */
  alert?: TemplateRef<unknown>;
  /**
   * 页头操作区域
   */
  actions?: QueryList<TemplateRef<unknown>>;

  /**
   * 设置页面数据
   */
  setPages(v: APIResponse<Page[]>): Observable<any> {
    const pages: Page[] = [];
    const values: Map<string, Page> = new Map<string, Page>();
    const paths: Map<string, Page> = new Map<string, Page>();
    for (const x of v.data!) {
      values.set(x._id, x);
      x.children = [];
      if (x.parent === 'root') {
        x.fragments = [x.fragment];
        pages.push(x);
      } else {
        if (values.has(x.parent)) {
          x.fragments = [...values.get(x.parent)!.fragments, x.fragment];
          values.get(x.parent)!.children.push(x);
        }
      }
      x.level = x.fragments.length;
      paths.set(x.fragments.join('/'), { ...x });
    }
    this.pages.next(pages);
    this.paths.next(paths);
    return this.pages.asObservable();
  }

  /**
   * 重置页头参数
   */
  reset(): void {
    this.skip = false;
    this.back = false;
    this.title = undefined;
    this.alert = undefined;
    this.actions = undefined;
  }

  /**
   * 树视图展开状态
   */
  setExpanded(nodes: NzTreeNode[], value: boolean): void {
    for (const node of nodes) {
      node.isExpanded = value;
      if (node.children.length !== 0) {
        this.setExpanded(node.children, value);
      }
    }
  }
}
