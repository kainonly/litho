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
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { BitModule, BitSupportService, BitSwalService } from 'ngx-bit';

registerLocaleData(zh);

import { AppExtModule } from '@ext';
import { AppComponent } from './app.component';
import { FrameworkModule, TokenService } from '@vanx/framework';
import { LoginComponent, LoginModule } from '@vanx/framework/login';
import { NgxTinymceModule } from 'ngx-tinymce';
import { TinymceConfig } from '@vanx/cms/component';

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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppExtModule,
    FrameworkModule,
    LoginModule,
    BitModule.forRoot(environment.bit),
    NgxTinymceModule.forRoot({
      baseURL: environment.bit.url.static + 'assets/tinymce/',
      config: TinymceConfig
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
