import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Collection, Db, ObjectId } from 'mongodb';
import { Codec, JSONCodec, NatsConnection } from 'nats';

import { DATABASE, NATS, REDIS } from '../api.providers';
import { IApp } from '../types';
import { Values } from './values';
import { ValuesLogs } from './values-logs';

@Injectable()
export class ValuesService {
  /**
   * 动态配置存储
   */
  store: Values = <Values>{};

  /**
   * 密文配置
   */
  secret: Set<string> = new Set<string>([
    'tencent_secret_key',
    'feishu_app_secret',
    'feishu_encrypt_key',
    'feishu_verification_token',
    'email_password',
    'openapi_secret',
  ]);

  /**
   * 应用设置
   * @private
   */
  private app: IApp;

  /**
   * 编码
   * @private
   */
  private sc: Codec<Values> = JSONCodec<Values>();

  /**
   * 日志集合
   * @private
   */
  private collection: Collection<ValuesLogs> = this.db.collection<ValuesLogs>('values_logs');

  constructor(
    private config: ConfigService,
    @Inject(REDIS) private redis: Redis,
    @Inject(DATABASE) private db: Db,
    @Inject(NATS) private nats: NatsConnection
  ) {
    this.app = config.get<IApp>('app');
  }

  /**
   * 命名
   */
  get key(): string {
    return `${this.app.namespace}:values`;
  }

  /**
   * 初始化动态配置
   * @param values 自定义默认值
   * @param secret 自定义密文字段
   */
  async load(values?: Partial<Values>, secret?: string[]): Promise<void> {
    const exists = await this.redis.exists(this.key);
    if (!exists) {
      await this.set(
        null, // 系统设置
        values ?? {
          session_ttl: 3600,
          login_ttl: 900,
          login_failures: 5,
          ip_login_failures: 10,
          ip_whitelist: [],
          ip_blacklist: [],
          pwd_strategy: 1,
          pwd_ttl: 365,
          tencent_cos_expired: 300,
          tencent_cos_limit: 5120,
          email_port: 465,
        }
      );
    }
    if (secret) {
      secret.forEach((value) => this.secret.add(value));
    }

    // 创建动态配置日志集合
    const colls = await this.db.listCollections({ name: 'values_logs' }).toArray();
    if (colls.length === 0) {
      await this.db.createCollection('values_logs', { timeseries: { timeField: 'time', metaField: 'uid' } });
    }

    const data = await this.redis.get(this.key);
    this.store = JSON.parse(data);

    // 同步其他节点动态配置
    (async () => {
      for await (const msg of this.nats.subscribe(this.key)) {
        this.store = this.sc.decode(msg.data);
      }
    })();
  }

  /**
   * 设置动态配置
   * @param uid 操作用户 ID
   * @param values 更新配置
   */
  async set(uid: ObjectId, values: Partial<Values>): Promise<void> {
    this.store = { ...this.store, ...values };
    await this.update(uid);
  }

  /**
   * 获取动态配置
   * @param keys
   */
  get(keys?: Array<keyof Values>): Partial<Values> {
    const data: Partial<Values> = {};
    keys = keys ?? (Object.keys(this.store) as Array<keyof Values>);

    for (const key of keys) {
      if (!this.secret.has(key as string)) {
        data[key] = this.store[key];
      } else {
        // 密文脱敏
        data[key] = !this.store[key] ? '-' : '*';
      }
    }

    return data;
  }

  /**
   * 移除动态配置
   * @param uid 操作用户 ID
   * @param key 移除配置键名
   */
  async remove(uid: ObjectId, key: keyof Values): Promise<void> {
    delete this.store[key];
    await this.update(uid);
  }

  /**
   * 更新配置
   * @private
   */
  private async update(uid?: ObjectId): Promise<void> {
    const data = JSON.stringify(this.store);
    const cmd = await this.redis.multi().set(this.key, data);

    // 发布同步配置
    this.nats.publish(this.key, this.sc.encode(this.store));
    cmd.exec();

    // 写入日志
    if (uid) {
      await this.collection.insertOne({
        time: new Date(),
        uid,
        snapshot: this.store,
      });
    }
  }
}
