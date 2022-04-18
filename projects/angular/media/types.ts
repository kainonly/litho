export interface Media {
  /**
   * 媒体名称
   */
  name: string;
  /**
   * 媒体URL
   */
  url: string;
  /**
   * 数据参数
   */
  params?: Record<string, string>;
  /**
   * 标记
   */
  labels?: string[];
}

export type MediaType = 'pictures' | 'videos';

export interface ImageInfoDto {
  format: string;
  height: number;
  width: number;
  size: number;
}
