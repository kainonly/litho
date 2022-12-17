export interface Project {
  /**
   * 项目名称
   */
  name: string;
  /**
   * 命名空间
   */
  namespace: string;
  /**
   * 密钥
   */
  secret?: string;
  /**
   * 白名单
   */
  entry: string[];
  /**
   * 有效期
   */
  expire: number;
  /**
   * 状态
   */
  status: boolean;
}
