import { User } from '@weplanx/common';
import { RedisOptions } from 'ioredis';
import { WithId } from 'mongodb';
import { ConnectionOptions } from 'nats/lib/src/nats-base-client';

export interface IConfig {
  /**
   * 服务端口
   */
  port: number;

  /**
   * 应用设置
   */
  app: IApp;

  /**
   * 数据库设置
   */
  database: IDatabase;

  /**
   * Redis 设置
   */
  redis: IRedis;

  /**
   * Nats 设置
   */
  nats: ConnectionOptions;
}

export interface IApp {
  /**
   * 命名空间
   */
  namespace: string;

  /**
   * 密钥
   */
  key: string;
}

export interface IDatabase {
  /**
   * MongoDB 连接地址
   */
  url: string;

  /**
   * 使用数据库
   */
  db: string;
}

export interface IRedis {
  /**
   * Redis 连接地址
   */
  url: string;

  /**
   * 配置
   */
  option: RedisOptions;
}

export interface IActiveUser {
  /**
   * 令牌 ID
   */
  jti: string;
  /**
   * 用户数据
   */
  data: WithId<User>;
}
