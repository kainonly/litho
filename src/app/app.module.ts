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

import { AppComponent } from './app.component';
import { TokenService } from '@common/token.service';
import { UpdateService } from '@common/update.service';
import { UiService } from '@common/ui.service';
import { LogicService } from '@common/logic.service';

import { MainService } from '@api/main.service';
import { AdminService } from '@api/admin.service';
import { RoleService } from '@api/role.service';
import { AclService } from '@api/acl.service';
import { ResourceService } from '@api/resource.service';
import { PolicyService } from '@api/policy.service';
import { GalleryTypeService } from '@api/gallery-type.service';
import { GalleryService } from '@api/gallery.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.router.module').then(m => m.AppRouterModule),
    canActivate: [TokenService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
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
    GalleryTypeService,
    GalleryService,

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
