import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

import { AppService } from './app.service';
import { ActiveData } from './types';

@Injectable()
export class AppStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private app: AppService) {
    const extractors: JwtFromRequestFunction[] = [req => req.cookies['access_token']];
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
      secretOrKey: config.get('KEY')
    });
  }

  async validate(payload: any): Promise<ActiveData> {
    return this.app.verify(payload);
  }
}
