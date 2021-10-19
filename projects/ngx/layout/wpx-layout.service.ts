import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';
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
   * 页头子标题
   */
  subTitle?: string;
  /**
   * 页头全局提示区域
   */
  alert?: TemplateRef<unknown>;
  /**
   * 页头标签区域
   */
  tags?: TemplateRef<unknown>;
  /**
   * 页头操作区域
   */
  actions?: QueryList<TemplateRef<unknown>>;
  /**
   * 页头内容区域
   */
  content?: TemplateRef<unknown>;
  /**
   * 页头尾部区域
   */
  footer?: TemplateRef<unknown>;

  constructor(private storage: StorageMap) {}

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
      const data = { ...x };
      Reflect.deleteProperty(data, '_id');
      paths.set(x.fragments.join('/'), data);
    }
    this.storage.set('paths', paths).subscribe(() => {
      this.pages.next(pages);
    });
    return this.pages.asObservable();
  }

  /**
   * 获取路径字典
   */
  get paths(): Observable<Map<string, Page>> {
    return this.storage.get('paths') as Observable<Map<string, Page>>;
  }

  /**
   * 重置页头参数
   */
  reset(): void {
    this.skip = false;
    this.back = false;
    this.title = undefined;
    this.subTitle = undefined;
    this.alert = undefined;
    this.tags = undefined;
    this.actions = undefined;
    this.content = undefined;
    this.footer = undefined;
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
