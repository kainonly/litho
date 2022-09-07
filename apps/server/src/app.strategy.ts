import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ApiService, IActiveUser, IApp } from '@weplanx/api';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

@Injectable()
export class AppStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private api: ApiService) {
    // 从 Cookie 中获取
    const extractors: JwtFromRequestFunction[] = [(req) => req.cookies['access_token']];
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
      secretOrKey: config.get<IApp>('app').key,
    });
  }

  async validate(payload: any): Promise<IActiveUser> {
    return this.api.verify(payload);
  }
}
