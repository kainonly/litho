import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from '@weplanx/utils';
import { REDIS } from '@weplanx/utils/providers';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('KEY'),
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService]
    }),
    SessionsModule,
    UtilsModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, REDIS]
})
export class AppModule {}
