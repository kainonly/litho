import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { REDIS } from '../api.providers';
import { IApp } from '../types';
import { ValuesService } from '../values/values.service';

@Injectable()
export class SessionsService {
  /**
   * 应用配置
   * @private
   */
  private app: IApp;

  constructor(private config: ConfigService, @Inject(REDIS) private redis: Redis, private values: ValuesService) {
    this.app = config.get<IApp>('app');
  }

  key(uid: string): string {
    return `${this.app.namespace}:sessions:${uid}`;
  }

  /**
   * 列出所有会话用户 ID
   */
  async lists(): Promise<any> {
    return new Promise((resolve) => {
      const stream = this.redis.scanStream({
        match: this.key('*'),
        count: 1000,
      });
      const uids = [];
      stream.on('data', (resultKeys) => {
        for (const key of resultKeys) {
          uids.push(key.replace(this.key(''), ''));
        }
      });
      stream.on('end', () => {
        resolve(uids);
      });
    });
  }

  /**
   * 验证会话一致性
   * @param uid 用户 ID
   * @param jti TokenID
   */
  async verify(uid: string, jti: string): Promise<boolean> {
    return jti === (await this.redis.get(this.key(uid)));
  }

  /**
   * 设置会话
   * @param uid 用户 ID
   * @param jti TokenID
   */
  async set(uid: string, jti: string): Promise<void> {
    await this.redis.setex(this.key(uid), this.values.store.session_ttl, jti);
  }

  /**
   * 续约会话
   * @param uid 用户 ID
   */
  async renew(uid: string): Promise<void> {
    await this.redis.expire(this.key(uid), this.values.store.session_ttl);
  }

  /**
   * 移除会话
   * @param uid 用户 ID
   */
  async remove(uid: string): Promise<void> {
    await this.redis.del(this.key(uid));
  }

  /**
   * 清除所有会话
   */
  async clear(): Promise<void> {
    const stream = this.redis.scanStream({
      match: this.key('*'),
      count: 1000,
    });
    const keys = [];
    stream.on('data', (resultKeys) => {
      for (const key of resultKeys) {
        keys.push(key);
      }
    });
    stream.on('end', async () => {
      await this.redis.del(keys);
    });
  }
}
