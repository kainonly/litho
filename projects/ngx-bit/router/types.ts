export interface ResourceStruct {
  /**
   * 父节点
   */
  parent: number | string;
  /**
   * PATH
   */
  path: string;
  /**
   * 资源名称
   */
  name: string;
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
   * 路由
   */
  routers: ResourceStruct[];
  /**
   * 资源字典
   */
  dict: Record<string, ResourceStruct>;
  /**
   * 扩展定义
   */
  [key: string]: any;
}
