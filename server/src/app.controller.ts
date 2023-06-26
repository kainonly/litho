import { Body, Controller, Get, HttpCode, Ip, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { Active, Cookies, Public } from './app.decorator';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ActiveData } from './types';

@Controller()
export class AppController {
  constructor(private app: AppService) {}

  @Get()
  @Public()
  async index(@Ip() ip: string) {
    return { ip };
  }

  @Post('login')
  @HttpCode(204)
  @Public()
  async authLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: FastifyReply): Promise<void> {
    const access_token = await this.app.login(body.email, body.password);
    res.setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
  }

  // @Get('verify')
  // async authVerify(@Active() data: ActiveData) {
  //   return {
  //     jti: data.jti
  //   };
  // }

  @Get('code')
  async authCode(@Active() data: ActiveData): Promise<{ code: string }> {
    const code = await this.app.code(data);
    return { code };
  }

  @Post('refresh_token')
  @HttpCode(204)
  async authRefresh(
    @Active() data: ActiveData,
    @Body() body: RefreshDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<void> {
    const access_token = await this.app.refresh(data, body.code);
    res.setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
  }

  @Post('logout')
  @HttpCode(200)
  async authLogout(@Active() data: ActiveData, @Res({ passthrough: true }) res: FastifyReply) {
    await this.app.logout(data.user.id.toString());
    res.clearCookie('access_token');
    return {
      code: 0,
      message: 'ok'
    };
  }
}
