import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { MongoClient } from 'mongodb';
import { connect, NatsConnection } from 'nats';
import { ConnectionOptions } from 'nats/lib/src/nats-base-client';

import { IDatabase, IRedis } from './types';

export const DATABASE = 'DATABASE';
export const REDIS = 'REDIS';
export const NATS = 'NATS';
export const JS = 'JS';
export const JSM = 'JSM';

export const PROVIDERS: Provider[] = [
  /**
   * MongoDB 初始化
   */
  {
    provide: DATABASE,
    useFactory: async (config: ConfigService) => {
      const { url, db } = config.get<IDatabase>('database');
      const client = new MongoClient(url);
      await client.connect();
      return client.db(db);
    },
    inject: [ConfigService],
  },
  /**
   * Redis 初始化
   */
  {
    provide: REDIS,
    useFactory: async (config: ConfigService) => {
      const { url, option } = config.get<IRedis>('redis');
      return new Redis(url, option);
    },
    inject: [ConfigService],
  },
  /**
   * Nats 初始化
   */
  {
    provide: NATS,
    useFactory: async (config: ConfigService) => {
      return await connect(config.get<ConnectionOptions>('nats'));
    },
    inject: [ConfigService],
  },
  /**
   * Nats JetStream 初始化
   */
  {
    provide: JS,
    useFactory: async (nc: NatsConnection) => {
      return nc.jetstream();
    },
    inject: [NATS],
  },
  /**
   * Nats JetStream Manager 初始化
   */
  {
    provide: JSM,
    useFactory: async (nc: NatsConnection) => {
      return await nc.jetstreamManager();
    },
    inject: [NATS],
  },
];
