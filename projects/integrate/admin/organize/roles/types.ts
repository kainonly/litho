export interface Role {
  /**
   * 权限名称
   */
  name: string;
  /**
   * 权限描述
   */
  description?: string;
  /**
   * 授权页面
   */
  pages: Record<string, number>;
  /**
   * 标记
   */
  labels: string[];
  /**
   * 状态
   */
  status: boolean;
}
