import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';

import { NZ_I18N, NzI18nModule, zh_CN } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { AppInterceptors } from './app.interceptors';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, HttpClientModule, HttpClientXsrfModule, NoopAnimationsModule, NzI18nModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptors, multi: true },
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class AppServerModule {}
