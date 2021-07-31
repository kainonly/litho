export type ID = number | string;

export interface Resource {
  /**
   * 节点 ID
   */
  id: ID;
  /**
   * 父节点 ID
   */
  pid: ID;
  /**
   * URL 片段
   */
  fragment: string;
  /**
   * 资源名称
   */
  name: string | Record<string, string>;
  /**
   * 是否为导航
   */
  nav: boolean;
  /**
   * 是否为路由
   */
  router: boolean;
  /**
   * 字体图标
   */
  icon: string;
  /**
   * 扩展定义
   */
  [key: string]: any;
}

export interface Resources {
  /**
   * 导航资源
   */
  navs: Resource[];
  /**
   * 源数据，通过ID得到资源
   */
  data: Record<ID, Resource>;
  /**
   * 字典，通过URL获得资源ID
   */
  dict: Record<string, ID>;
  /**
   * 扩展定义
   */
  [key: string]: any;
}
