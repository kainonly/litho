import { Values } from '@weplanx/common';
import { ObjectId } from 'mongodb';

export interface ValuesLogs {
  /**
   * 操作时间
   */
  time: Date;

  /**
   * 用户 ID
   */
  uid: ObjectId;

  /**
   * 快照
   */
  snapshot: Values;
}
