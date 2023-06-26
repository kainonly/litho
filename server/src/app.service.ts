import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from '@node-rs/argon2';
import { CaptchaService, LockerService } from '@weplanx/utils';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from './prisma.service';
import { SessionsService } from './sessions/sessions.service';
import { ActiveData } from './types';

@Injectable()
export class AppService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
    private locker: LockerService,
    private captcha: CaptchaService,
    private sessions: SessionsService
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.db.user.findFirst({ where: { email, status: true } });
    if (!user) {
      throw new UnauthorizedException('the password verification error');
    }
    const uid = user.id.toString();
    const isLocked = await this.locker.verify(uid);
    if (isLocked) {
      throw new UnauthorizedException('the maximum number of user login failures has been exceeded');
    }

    const incorrect = await verify(user.password, password);
    if (!incorrect) {
      await this.locker.update(uid);
      throw new UnauthorizedException('the password verification error');
    }

    const jti = uuidv4();
    const access_token = await this.jwt.signAsync({ uid: user.id }, { jwtid: jti });

    await this.locker.delete(uid);
    await this.sessions.set(uid, jti);

    return access_token;
  }

  async verify({ jti, uid }: any): Promise<ActiveData> {
    const consistent = await this.sessions.verify(uid, jti);
    if (!consistent) {
      throw new UnauthorizedException('inconsistent session token');
    }

    const user = await this.db.user.findFirst({
      where: {
        id: parseInt(uid),
        status: true
      }
    });
    if (!user) {
      throw new UnauthorizedException('the user is disabled or removed');
    }
    delete user.password;

    await this.sessions.renew(uid);
    return { jti, user };
  }

  async code({ user }: ActiveData): Promise<string> {
    const code = uuidv4();
    await this.captcha.create(user.id.toString(), code, 15);
    return code;
  }

  async refresh(data: ActiveData, code: string): Promise<string> {
    const uid = data.user.id.toString();
    const result = await this.captcha.verify(uid, code);
    if (!result) {
      throw new BadRequestException('inconsistent token refresh parameters');
    }
    await this.captcha.delete(uid);
    return await this.jwt.signAsync(
      { uid },
      {
        jwtid: data.jti
      }
    );
  }

  async logout(uid: string): Promise<void> {
    await this.sessions.delete(uid);
  }
}
