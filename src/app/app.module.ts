import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import merge from 'merge';
import zh from '@angular/common/locales/zh';
import { environment } from '@env';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { StorageModule } from '@ngx-pwa/local-storage';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';

registerLocaleData(zh);

import { AppExtModule } from '@ext';
import { NzIconService } from 'ng-zorro-antd/icon';

import { AppComponent } from './app.component';
import { FrameworkModule, TokenService } from '@vanx/framework';
import { LoginComponent, LoginModule } from '@vanx/framework/login';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.router.module').then(m => m.AppRouterModule),
    canActivate: [TokenService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'bottomRight' }
};

const bitConfig = () => {
  const env = environment.bit;
  const service = new BitConfigService();
  return merge.recursive(service, env);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppExtModule,
    FrameworkModule,
    LoginModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StorageModule.forRoot({
      IDBDBName: 'ngx-bit'
    })
  ],
  providers: [
    // Common Service

    // API Service

    // Library Service
    NzIconService,
    BitService,
    BitHttpService,
    BitEventsService,
    BitSupportService,
    BitSwalService,
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: BitConfigService, useFactory: bitConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    config: BitConfigService,
    nzIconService: NzIconService
  ) {
    if (config.url.icon) {
      nzIconService.changeAssetsSource(config.url.icon);
    }
  }
}
