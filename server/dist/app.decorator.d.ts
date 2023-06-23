import { CustomDecorator } from '@nestjs/common';
export declare const Active: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => CustomDecorator;
