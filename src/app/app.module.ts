import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxBitModule } from 'ngx-bit';
import { environment } from '@env';

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
    NgxBitModule.forRoot(environment.bit),
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StorageModule.forRoot({ IDBNoWrap: false })
  ],
  providers: [
    UpdateService,
    TokenService,
    UiSerivce,
    MainService,
    AclService,
    ResourceService,
    PolicyService,
    RoleService,
    AdminService,
    GalleryTypeService,
    GalleryService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: perfectBar }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
