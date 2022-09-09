import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';

import { SessionsService } from './sessions/sessions.service';
import { IActiveUser } from './types';
import { UsersService } from './users/users.service';
import { CaptchaService } from './utils/captcha/captcha.service';
import { LockerService } from './utils/locker/locker.service';
import { ValuesService } from './values/values.service';

@Injectable()
export class ApiService {
  constructor(
    private jwt: JwtService,
    private users: UsersService,
    private sessions: SessionsService,
    private locker: LockerService,
    private values: ValuesService,
    private captcha: CaptchaService
  ) {}

  /**
   * 登录
   * @param identity 身份标识
   * @param password 密码
   */
  async login(identity: string, password: string): Promise<string> {
    const user = await this.users.findOneByIdentity(identity);
    const uid = user._id.toHexString();

    // 锁定上限验证
    const isLocked = await this.locker.verify(uid);
    if (isLocked) {
      throw new UnauthorizedException('用户登录失败已超出最大次数');
    }

    // 密码验证
    const verify = await argon2.verify(user.password, password);
    if (!verify) {
      // 锁定更新
      await this.locker.update(uid);
      throw new UnauthorizedException('用户名或密码验证错误');
    }

    // 生成令牌
    const jti = nanoid();
    const access_token = await this.jwt.signAsync({ uid }, { jwtid: jti });

    // 移除锁定，建立会话
    await this.locker.delete(uid);
    await this.sessions.set(uid, jti);

    return access_token;
  }

  /**
   * 验证并返回授权用户
   * @param jti 令牌 ID
   * @param uid 用户 ID
   */
  async verify({ jti, uid }: any): Promise<IActiveUser> {
    // 检测会话
    const consistent = await this.sessions.verify(uid, jti);
    if (!consistent) {
      throw new UnauthorizedException('会话令牌不一致');
    }

    // 检测用户
    const data = await this.users.getActived(new ObjectId(uid));
    if (!data) {
      throw new UnauthorizedException('用户被禁用或已被移除');
    }
    delete data.password;

    // 会话续约
    await this.sessions.renew(uid);
    return { jti, data };
  }

  /**
   * 令牌刷新验证码
   * @param data
   */
  async code({ data }: IActiveUser): Promise<string> {
    const code = nanoid();
    await this.captcha.create(data._id.toHexString(), code, 15);
    return code;
  }

  /**
   * 刷新令牌
   * @param user 授权用户
   * @param code 验证码
   */
  async refresh(user: IActiveUser, code: string): Promise<string> {
    const uid = user.data._id.toHexString();
    const result = await this.captcha.verify(uid, code);
    if (!result) {
      throw new BadRequestException('令牌刷新参数不一致');
    }
    await this.captcha.delete(uid);
    return await this.jwt.signAsync(
      { uid },
      {
        jwtid: user.jti
      }
    );
  }

  /**
   * 配置返回
   * @param type 类型
   */
  options(type: string): any {
    const { store } = this.values;
    switch (type) {
      case 'upload':
        switch (store.cloud) {
          // 腾讯云 COS 对象存储
          case 'tencent':
            return {
              type: 'cos',
              url: `https://${store.tencent_cos_bucket}.cos.${store.tencent_cos_region}.myqcloud.com`,
              limit: store.tencent_cos_limit
            };
        }
        return {};
      case 'office':
        switch (store.office) {
          // 飞书
          case 'feishu':
            return {
              url: 'https://open.feishu.cn/open-apis/authen/v1/index',
              redirect: store.redirect_url,
              app_id: store.feishu_app_id
            };
        }
        return {};
    }
  }
}
