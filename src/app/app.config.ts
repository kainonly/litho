import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  importProvidersFrom,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SharedModule } from '@shared';

import { appInterceptor } from './app.interceptor';
import { routes } from './app.routes';

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withInterceptors([appInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideNzI18n(zh_CN),
    provideNzConfig({
      notification: { nzPlacement: 'bottomRight' },
      card: { nzBordered: false },
      table: { nzSize: 'middle', nzBordered: true }
    }),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(SharedModule, NzMessageService, NzNotificationService),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:10000'
    })
  ]
};
