import { Global, Module } from '@nestjs/common';

import { PROVIDERS } from './api.providers';
import { DepartmentsModule } from './departments/departments.module';
import { DslModule } from './dsl/dsl.module';
import { PagesModule } from './pages/pages.module';
import { RolesModule } from './roles/roles.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { CaptchaModule } from './utils/captcha/captcha.module';
import { LockerModule } from './utils/locker/locker.module';
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
    CaptchaModule
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
    ...PROVIDERS
  ],
  providers: [...PROVIDERS]
})
export class ApiModule {}
