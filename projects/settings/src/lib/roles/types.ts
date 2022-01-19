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
   * 所属页面
   */
  pages?: string[];
  /**
   * 只读权限
   */
  readonly?: string[];
  /**
   * 标记
   */
  labels: string[];
  /**
   * 状态
   */
  status: boolean;
}
