import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { REDIS } from '../api.providers';
import { IApp } from '../types';

@Injectable()
export class CaptchaService {
  /**
   * 应用设置
   * @private
   */
  private app: IApp;

  constructor(@Inject(REDIS) private redis: Redis, private config: ConfigService) {
    this.app = config.get<IApp>('app');
  }

  /**
   * 验证键名
   * @param name 命名
   */
  key(name: string): string {
    return `${this.app.namespace}:captcha:${name}`;
  }

  /**
   * 创建验证码
   * @param name 命名
   * @param code 验证码数值
   * @param ttl 生存周期
   */
  async create(name: string, code: string, ttl: number): Promise<void> {
    await this.redis.setex(this.key(name), ttl, code);
  }

  /**
   * 存在验证码
   * @param name 命名
   */
  async exists(name: string): Promise<boolean> {
    return (await this.redis.exists(this.key(name))) !== 0;
  }

  /**
   * 校验验证码
   * @param name 命名
   * @param code 验证码数值
   */
  async verify(name: string, code: string): Promise<boolean> {
    return code === (await this.redis.get(this.key(name)));
  }

  /**
   * 移除验证码
   * @param name 命名
   */
  async delete(name: string): Promise<void> {
    await this.redis.del(this.key(name));
  }
}
