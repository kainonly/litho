export interface Role {
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 授权页面
   */
  pages: Record<string, number>;
  /**
   * 状态
   */
  status: boolean;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 更新时间
   */
  update_time: Date;
}
