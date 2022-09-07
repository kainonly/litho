import { createParamDecorator, CustomDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

/**
 * 授权用户装饰器
 */
export const Active = createParamDecorator(
  (data: string, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user
);

/**
 * 公开接口装饰器
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
