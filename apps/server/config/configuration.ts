import { IConfig } from '@weplanx/api';
import { nkeyAuthenticator } from 'nats';

export default (): IConfig => ({
  port: parseInt(process.env.PORT) || 3000,
  app: {
    namespace: process.env.APP_NAMESPACE,
    key: process.env.APP_KEY
  },
  database: {
    url: process.env.DATABASE_URL,
    db: process.env.DATABASE_DB
  },
  redis: {
    url: process.env.REDIS_URL,
    option: {
      tls: {
        servername: process.env.REDIS_TLS_SERVERNAME
      }
    }
  },
  nats: {
    servers: process.env.NATS_SERVERS.split(','),
    authenticator: nkeyAuthenticator(new TextEncoder().encode(process.env.NATS_NKEY))
  }
});
