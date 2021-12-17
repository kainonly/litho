export interface FieldOption {
  /**
   * 最大值
   */
  max: number;
  /**
   * 最小值
   */
  min: number;
  /**
   * 保留小数
   */
  decimal: number;
  /**
   * 枚举
   */
  values: Array<Value>;
  /**
   * 引用数据源
   */
  reference: string;
  /**
   * 引用目标
   */
  target: string;
  /**
   * 多选
   */
  multiple: boolean;
}

export type Value = {
  label: string;
  value: any;
};
