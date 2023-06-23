import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { nanoid } from 'nanoid';

import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private db: PrismaService, private jwt: JwtService) {}
  /**
   * Login
   * @param email
   * @param password
   */
  async login(email: string, password: string): Promise<string> {
    const user = await this.db.user.findFirst({ where: { email } });

    // const isLocked = await this.locker.verify(user.id);
    // if (isLocked) {
    //   throw new UnauthorizedException('用户登录失败已超出最大次数');
    // }

    // const verify = await argon2.verify(user.password, password);
    // if (!verify) {
    //   // await this.locker.update(user.id);
    //   throw new UnauthorizedException('用户名或密码验证错误');
    // }

    const jti = nanoid();
    const access_token = await this.jwt.signAsync({ uid: user.id }, { jwtid: jti });

    // 移除锁定，建立会话
    // await this.locker.delete(uid);
    // await this.sessions.set(uid, jti);

    return access_token;
  }
}
