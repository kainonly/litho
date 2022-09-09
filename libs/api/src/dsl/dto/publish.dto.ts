export class PublishDto {
  /**
   * 事件名称
   */
  event: string;

  /**
   * 文档 ID
   */
  id: string;

  /**
   * 筛选条件
   */
  query: Record<string, any>;

  /**
   * 请求主体
   */
  body: Record<string, any>;

  /**
   * 返回结果
   */
  result: Record<string, any>;
}
