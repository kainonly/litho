import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

export const REDIS: Provider = {
  provide: 'REDIS',
  useFactory: async (config: ConfigService) => {
    const client = createClient({
      url: config.get('REDIS_URL')
    });
    await client.connect();
    return client;
  },
  inject: [ConfigService]
};
