export interface Role {
  _id: string;
  /**
   * 权限代码
   */
  key: string;
  /**
   * 父节点
   */
  parent: string;
  /**
   * 权限名称
   */
  name: string;
  /**
   * 所属页面
   */
  pages: string[];
  /**
   * 只读权限
   */
  readonly: string[];
  /**
   * 状态
   */
  status: boolean;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 修改时间
   */
  update_time: Date;

  /**
   * 自定义
   */
  [key: string]: any;
}
