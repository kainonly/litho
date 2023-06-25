import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from '@node-rs/argon2';
import { LockerService } from '@weplanx/utils';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from './prisma.service';
import { SessionsService } from './sessions/sessions.service';

@Injectable()
export class AppService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
    private locker: LockerService,
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
}
