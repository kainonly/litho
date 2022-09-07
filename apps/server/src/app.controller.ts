import { Body, Controller, Delete, Get, Head, HttpCode, Ip, Patch, Post, Put, Query, Res } from '@nestjs/common';

import { Active, ApiService, IActiveUser, Public } from '@weplanx/api';
import { SetUserDto } from '@weplanx/api/users/dto/set-user.dto';
import { UsersService } from '@weplanx/api/users/users.service';
import { FastifyReply } from 'fastify';

import { LoginDto } from './dto/login.dto';
import { OptionsDto } from './dto/options.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller()
export class AppController {
  constructor(private api: ApiService, private users: UsersService) {}

  @Get()
  @Public()
  index(@Ip() ip: string): any {
    return { ip, time: new Date() };
  }

  @Post('auth')
  @HttpCode(204)
  @Public()
  async authLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: FastifyReply): Promise<any> {
    const access_token = await this.api.login(body.identity, body.password);
    res.setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
  }

  @Head('auth')
  @HttpCode(204)
  authVerify(): void {
    return;
  }

  @Get('auth')
  async authCode(@Active() user: IActiveUser): Promise<any> {
    const code = await this.api.code(user);
    return { code };
  }

  @Put('auth')
  @HttpCode(204)
  async authRefresh(
    @Active() user: IActiveUser,
    @Body() body: RefreshDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<void> {
    const access_token = await this.api.refresh(user, body.code);
    res.setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
  }

  @Delete('auth')
  @HttpCode(204)
  authLogout(@Res({ passthrough: true }) res: FastifyReply): void {
    res.clearCookie('access_token');
  }

  @Get('user')
  async getUser(@Active() { data }: IActiveUser): Promise<any> {
    return this.users.getUser(data);
  }

  @Patch('user')
  async setUser(@Active() { data }: IActiveUser, @Body() body: SetUserDto): Promise<void> {
    await this.users.setUser(data._id, body);
  }

  @Get('options')
  options(@Query() query: OptionsDto): Promise<any> {
    return this.api.options(query.type);
  }
}
