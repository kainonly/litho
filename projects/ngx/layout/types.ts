import { QueryList, TemplateRef } from '@angular/core';

export interface WpxLayout {
  skip: boolean;
  back: boolean;
  title: string;
  subTitle: string;
  alert: TemplateRef<unknown>;
  tags: TemplateRef<unknown>;
  actions: QueryList<TemplateRef<unknown>>;
  content: TemplateRef<unknown>;
  footer: TemplateRef<any>;
}

export interface WpxPageNodes {
  /**
   * 路径字典
   */
  dict: Record<string, WpxPageNode>;
  /**
   * 树节点
   */
  nodes: WpxPageNode[];
  /**
   * 扩展定义
   */
  [key: string]: any;
}

export interface WpxPageNode {
  id: any;
  /**
   * 父节点
   */
  parent: any;
  /**
   * URL片段
   */
  fragment: string;
  /**
   * URL片段组
   */
  fragments: string[];
  /**
   * 层级
   */
  level: number;
  /**
   * 节点名称
   */
  name: string;
  /**
   * 路由配置
   */
  router: WpxRouter;
  /**
   * 是否为导航
   */
  nav: boolean;
  /**
   * 字体图标
   */
  icon: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 子集
   */
  children: WpxPageNode[];
  /**
   * 扩展定义
   */
  [key: string]: any;
}

export interface WpxRouter {
  /**
   * 引用模型
   */
  schema: string;
  /**
   * 使用模板
   */
  template: string;
}
