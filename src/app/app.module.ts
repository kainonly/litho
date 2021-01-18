import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { environment } from '@env';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

registerLocaleData(zh);

import { AppComponent } from './app.component';
import { TokenService } from '@common/token.service';
import { MainService } from '@common/main.service';
import { AdminService } from '@common/admin.service';
import { RoleService } from '@common/role.service';
import { AclService } from '@common/acl.service';
import { ResourceService } from '@common/resource.service';
import { PolicyService } from '@common/policy.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateService } from '@common/update.service';
import { StorageModule } from '@ngx-pwa/local-storage';
import { AppExtModule } from '@ext';
import { GalleryTypeService } from '@common/gallery-type.service';
import { GalleryService } from '@common/gallery.service';
import { UiSerivce } from '@common/ui.serivce';
import { NzIconService } from 'ng-zorro-antd/icon';

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
    NzIconService,
    BitService,
    BitHttpService,
    BitEventsService,
    BitSupportService,
    BitSwalService,
    { provide: BitConfigService, useFactory: bitConfig },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: perfectBar },
    UiSerivce,
    UpdateService,
    TokenService,
    MainService,
    AclService,
    ResourceService,
    PolicyService,
    RoleService,
    AdminService,
    GalleryTypeService,
    GalleryService
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
