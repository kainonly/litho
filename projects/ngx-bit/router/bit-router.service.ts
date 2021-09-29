import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Pages } from './types';

@Injectable({
  providedIn: 'root'
})
export class BitRouterService {
  /**
   * 驱动资源
   */
  readonly pages: BehaviorSubject<Pages> = new BehaviorSubject<Pages>({
    dict: {},
    nodes: []
  });
  /**
   * URL片段
   */
  fragments!: string[];
  /**
   * 忽略页头
   */
  readonly skip: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * 显示返回
   */
  readonly back: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * 顶部提示
   */
  readonly alert: BehaviorSubject<TemplateRef<any> | null> = new BehaviorSubject<TemplateRef<any> | null>(null);
  /**
   * 标题
   */
  readonly title: BehaviorSubject<string | Record<string, string> | null> = new BehaviorSubject<
    string | Record<string, string> | null
  >(null);
  /**
   * 页头子标题
   */
  readonly subTitle: BehaviorSubject<string | Record<string, string> | null> = new BehaviorSubject<
    string | Record<string, string> | null
  >(null);
  /**
   * 页头标签
   */
  readonly tags: BehaviorSubject<TemplateRef<any> | null> = new BehaviorSubject<TemplateRef<any> | null>(null);
  /**
   * 页头操作区
   */
  readonly actions: BehaviorSubject<QueryList<TemplateRef<any>> | null> = new BehaviorSubject<QueryList<
    TemplateRef<any>
  > | null>(null);
  /**
   * 页头内容
   */
  readonly content: BehaviorSubject<TemplateRef<any> | null> = new BehaviorSubject<TemplateRef<any> | null>(null);
  /**
   * 页头底部
   */
  readonly footer: BehaviorSubject<TemplateRef<any> | null> = new BehaviorSubject<TemplateRef<any> | null>(null);

  constructor(private router: Router) {}
  /**
   * 监听路由状态
   */
  activated(): void {
    this.resetPageHeaderAttr();

    const root = this.router.routerState.root.snapshot.firstChild;
    console.log(root);

    // this.router.events.pipe(take(1)).subscribe(e => {
    //   console.log(e);
    // });
    // this.fragments = this.router.url.slice(1).split('/');
  }
  /**
   * 重置页头属性
   */
  private resetPageHeaderAttr(): void {
    this.skip.next(false);
    this.back.next(false);
    this.title.next(null);
    this.subTitle.next(null);
    this.alert.next(null);
    this.tags.next(null);
    this.actions.next(null);
    this.content.next(null);
    this.footer.next(null);
  }
}
