import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { PageHeader, Resources } from './types';

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
   * 页头变量
   */
  readonly ph: BehaviorSubject<Partial<PageHeader>> = new BehaviorSubject<Partial<PageHeader>>({});

  constructor(private router: Router) {}

  /**
   * 监听路由状态
   */
  onActived(): void {
    this.fragments = this.router.url.slice(1).split('/');
    this.urls = [];
    for (let i = 0; i < this.fragments.length; i++) {
      this.urls.push(this.fragments.slice(0, i + 1).join('/'));
    }
  }
}
