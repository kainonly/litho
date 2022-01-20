export interface Media {
  /**
   * 媒体类型
   */
  type: string;
  /**
   * 媒体名称
   */
  name: string;
  /**
   * 媒体URL
   */
  url: string;
  /**
   * 标记
   */
  labels?: string[];
}
