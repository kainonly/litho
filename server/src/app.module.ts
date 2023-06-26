import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UtilsModule } from '@weplanx/utils';
import { REDIS } from '@weplanx/utils/providers';

import { AppAuthGuard } from './app-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppStrategy } from './app.strategy';
import { PrismaService } from './prisma.service';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    PassportModule.register({}),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('KEY'),
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService]
    }),
    SessionsModule,
    UtilsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    REDIS,
    PrismaService,
    AppService,
    AppStrategy,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard
    }
  ]
})
export class AppModule {}
