import { AnyDto, Value } from '@weplanx/common';

export interface Role {
  /**
   * 权限代码
   */
  key: string;
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
   * 标签
   */
  labels: Value[];
  /**
   * 状态
   */
  status: boolean;
}

export type RoleDto = AnyDto<Role>;
