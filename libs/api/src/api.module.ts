import { Global, Module } from '@nestjs/common';

import { PROVIDERS } from './api.providers';
import { CaptchaModule } from './captcha/captcha.module';
import { DepartmentsModule } from './departments/departments.module';
import { DslModule } from './dsl/dsl.module';
import { FeishuModule } from './feishu/feishu.module';
import { LockerModule } from './locker/locker.module';
import { PagesModule } from './pages/pages.module';
import { RolesModule } from './roles/roles.module';
import { SessionsModule } from './sessions/sessions.module';
import { TencentModule } from './tencent/tencent.module';
import { UsersModule } from './users/users.module';
import { ValuesModule } from './values/values.module';

@Global()
@Module({
  imports: [
    DslModule,
    ValuesModule,
    LockerModule,
    UsersModule,
    SessionsModule,
    PagesModule,
    RolesModule,
    DepartmentsModule,
    CaptchaModule,
    TencentModule,
    FeishuModule,
  ],
  exports: [
    DslModule,
    ValuesModule,
    LockerModule,
    UsersModule,
    SessionsModule,
    PagesModule,
    RolesModule,
    DepartmentsModule,
    CaptchaModule,
    ...PROVIDERS,
  ],
  providers: [...PROVIDERS],
})
export class ApiModule {}
