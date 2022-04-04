export interface Department {
  /**
   * 父级
   */
  parent: string | null;
  /**
   * 权限名称
   */
  name: string;
  /**
   * 权限描述
   */
  description?: string;
  /**
   * 标记
   */
  labels: string[];
}
