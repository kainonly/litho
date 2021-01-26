import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import zh from '@angular/common/locales/zh';
import { environment } from '@env';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { StorageModule } from '@ngx-pwa/local-storage';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

registerLocaleData(zh);

import { AppExtModule } from '@ext';
import { NzIconService } from 'ng-zorro-antd/icon';

import { TokenService, UiService, UpdateService } from 'van-skeleton';
import { LoginComponent, MainService, SkeletonModule } from 'van-skeleton/skeleton';
import { AclService } from 'van-skeleton/acl';
import { PolicyService, ResourceService } from 'van-skeleton/resource';
import { RoleService } from 'van-skeleton/role';
import { AdminService } from 'van-skeleton/admin';

import { AppComponent } from './app.component';
import { LogicService } from '@common/logic.service';
import { PictureTypeService } from '@api/picture-type.service';
import { PictureService } from '@api/picture.service';

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
  Reflect.ownKeys(env).forEach(key => {
    service[key] = env[key];
  });
  return service;
};

const perfectBar: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppExtModule,
    SkeletonModule,
    PerfectScrollbarModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StorageModule.forRoot({ IDBNoWrap: false })
  ],
  providers: [
    // Common Service
    UpdateService,
    TokenService,
    UiService,
    LogicService,

    // API Service
    MainService,
    AclService,
    ResourceService,
    PolicyService,
    RoleService,
    AdminService,
    PictureTypeService,
    PictureService,

    // Library Service
    NzIconService,
    BitService,
    BitHttpService,
    BitEventsService,
    BitSupportService,
    BitSwalService,
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: BitConfigService, useFactory: bitConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: perfectBar }
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
