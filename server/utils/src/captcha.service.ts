import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';

@Injectable()
export class CaptchaService {
  constructor(@Inject('REDIS') private redis: RedisClientType, private config: ConfigService) {}

  key(name: string): string {
    return `${this.config.get('NAMESPACE')}:captcha:${name}`;
  }

  async create(name: string, code: string, ttl: number): Promise<void> {
    await this.redis.setEx(this.key(name), ttl, code);
  }

  async exists(name: string): Promise<boolean> {
    return (await this.redis.exists(this.key(name))) !== 0;
  }

  async verify(name: string, code: string): Promise<boolean> {
    return code === (await this.redis.get(this.key(name)));
  }

  async delete(name: string): Promise<void> {
    await this.redis.del(this.key(name));
  }
}
