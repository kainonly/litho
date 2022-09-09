import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

import { REDIS } from '../../api.providers';
import { IApp } from '../../types';

@Injectable()
export class LockerService {
  /**
   * 应用设置
   * @private
   */
  private app: IApp;

  constructor(@Inject(REDIS) private redis: Redis, private config: ConfigService) {
    this.app = config.get<IApp>('app');
  }

  /**
   * 锁定键名
   * @param name 命名
   */
  key(name: string): string {
    return `${this.app.namespace}:locker:${name}`;
  }

  /**
   * 更新锁定
   * @param name 命名
   */
  async update(name: string): Promise<void> {
    const key = this.key(name);
    const exists = await this.redis.exists(key);
    if (exists === 0) {
      await this.redis.setex(key, 900, 0);
    } else {
      await this.redis.multi().incr(key).expire(key, 900).exec();
    }
  }

  /**
   * 校验锁定，True 为锁定
   * @param name 命名
   */
  async verify(name: string): Promise<boolean> {
    const key = this.key(name);
    const times = await this.redis.get(key);
    return parseInt(times) > 5;
  }

  /**
   * 移除锁定
   * @param name 命名
   */
  async delete(name: string): Promise<void> {
    await this.redis.del(this.key(name));
  }
}
