import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';

@Injectable()
export class LockerService {
  constructor(@Inject('REDIS') private redis: RedisClientType, private config: ConfigService) {}

  key(name: string): string {
    return `${this.config.get('NAMESPACE')}:locker:${name}`;
  }

  async update(name: string): Promise<void> {
    const key = this.key(name);
    const exists = await this.redis.exists(key);
    if (exists === 0) {
      await this.redis.setEx(key, 900, '0');
    } else {
      await this.redis.multi().incr(key).expire(key, 900).exec();
    }
  }

  async verify(name: string): Promise<boolean> {
    const key = this.key(name);
    const times = await this.redis.get(key);
    return parseInt(times) > 5;
  }

  async delete(name: string): Promise<void> {
    await this.redis.del(this.key(name));
  }
}
