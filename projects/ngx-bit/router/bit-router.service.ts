import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Resources } from './types';

@Injectable({
  providedIn: 'root'
})
export class BitRouterService {
  /**
   * 驱动资源
   */
  resources!: Resources;
  /**
   * URL片段
   */
  fragments!: string[];
  /**
   * URL层级数组
   */
  urls: string[] = [];
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
  onActived(): void {
    this.resetPageHeaderAttr();
    this.fragments = this.router.url.slice(1).split('/');
    this.urls = [];
    for (let i = 0; i < this.fragments.length; i++) {
      this.urls.push(this.fragments.slice(0, i + 1).join('/'));
    }
  }

  /**
   * 重置页头属性
   */
  private resetPageHeaderAttr(): void {
    this.skip.next(false);
    this.back.next(false);
    this.subTitle.next(null);
    this.alert.next(null);
    this.tags.next(null);
    this.actions.next(null);
    this.content.next(null);
    this.footer.next(null);
  }
}
