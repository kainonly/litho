export interface RouterOption {
  /**
   * 引用模型
   */
  schema: string;
  /**
   * 使用模板
   */
  template: string;
}

export interface PageStruct {
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
  router: RouterOption;
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
  children: PageStruct[];
  /**
   * 扩展定义
   */
  [key: string]: any;
}

export interface Pages {
  /**
   * 路径字典
   */
  dict: Record<string, PageStruct>;
  /**
   * 树节点
   */
  nodes: PageStruct[];
  /**
   * 扩展定义
   */
  [key: string]: any;
}
