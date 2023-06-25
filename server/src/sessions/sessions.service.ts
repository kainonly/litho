import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class SessionsService {
  constructor(@Inject('REDIS') private redis: RedisClientType) {}

  private key(name: string): string {
    return `sessions:${name}`;
  }

  async list(): Promise<string[]> {
    const uids = [];
    for await (const key of this.redis.scanIterator({
      TYPE: 'string',
      MATCH: this.key('*'),
      COUNT: 1000
    })) {
      const v = await this.redis.get(key);
      uids.push(v.replace(this.key(''), ''));
    }
    return uids;
  }

  async verify(uid: string, jti: string): Promise<boolean> {
    return jti === (await this.redis.get(this.key(uid)));
  }

  async set(uid: string, jti: string): Promise<void> {
    await this.redis.setEx(this.key(uid), 3600, jti);
  }

  async renew(uid: string): Promise<void> {
    await this.redis.expire(this.key(uid), 3600);
  }

  async delete(uid: string): Promise<void> {
    await this.redis.del(this.key(uid));
  }

  async clear(): Promise<void> {
    const keys = [];
    for await (const key of this.redis.scanIterator({
      TYPE: 'string',
      MATCH: this.key('*'),
      COUNT: 1000
    })) {
      keys.push(key);
    }
    await this.redis.del(keys);
  }
}
