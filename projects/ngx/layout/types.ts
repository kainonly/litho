export interface Page {
  /**
   * 主键
   */
  _id: string;
  /**
   * 父节点
   */
  parent: string;
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
   * 是否为路由
   */
  router?: 'manual' | 'table' | 'form';
  /**
   * 页面设置
   */
  option?: PageOption;
  /**
   * 子集
   */
  children: Page[];
  /**
   * 扩展定义
   */
  [key: string]: any;
}

export interface PageOption {
  /**
   * 引用内容类型
   */
  schema: string;
  /**
   * 是否预加载
   */
  fetch: boolean;
  /**
   * 视图字段
   */
  fields: ViewField[];
  /**
   * JSON Schema 验证
   */
  validation: unknown;
}

export interface ViewField {
  /**
   * 字段名
   */
  key: string;
  /**
   * 显示名称
   */
  label: string;
  /**
   * 是否显示
   */
  display: boolean;
}
