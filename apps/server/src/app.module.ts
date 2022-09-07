import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiModule, ApiService } from '@weplanx/api';
import { IApp } from '@weplanx/api';
import { ValuesService } from '@weplanx/api/values/values.service';

import configuration from '../config/configuration';
import { AppAuthGuard } from './app-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppStrategy } from './app.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PassportModule.register({}),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<IApp>('app').key,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ApiService,
    AppStrategy,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private values: ValuesService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.values.load();
  }
}
