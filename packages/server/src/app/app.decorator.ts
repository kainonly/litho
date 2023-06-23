import { createParamDecorator, CustomDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const Active = createParamDecorator(
  (data: string, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user
);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
