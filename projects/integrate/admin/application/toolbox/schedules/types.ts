export interface Schedule {
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 任务
   */
  jobs: ScheduleJob[];
  /**
   * 状态
   */
  status: boolean;
}

export interface ScheduleJob {
  /**
   * 触发模式
   */
  mode: string;
  /**
   * 计时规格
   */
  spec: string;
  /**
   * 配置
   */
  option: HttpOption;
}

export interface HttpOption {
  /**
   * 网络回调地址
   */
  url: string;
  /**
   * 请求头部
   */
  headers: Record<string, string>;
  /**
   * 请求体
   */
  body: Record<string, any>;
}
