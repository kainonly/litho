import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { ShareModule } from '@common/share.module';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

import { appInterceptor } from './app.interceptor';
import { routes } from './app.routes';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ShareModule),
    provideNzI18n(en_US),
    provideNzConfig({
      notification: { nzPlacement: 'bottomRight' },
      card: { nzBordered: false },
      table: { nzSize: 'middle', nzBordered: true }
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([appInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
