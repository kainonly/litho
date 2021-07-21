import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppService } from '@common/app.service';
import { environment } from '@env';
import { AppShareModule } from '@share';
import { FrameworkModule } from '@vanx/framework';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BitModule } from 'ngx-bit';
import { BitSwalModule } from 'ngx-bit/swal';

import { AppGuard } from './app-guard';
import { AppInterceptors } from './app-interceptors';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

registerLocaleData(en);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app-routing.module').then(m => m.AppRoutingModule),
    canActivate: [AppGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'bottomRight' },
  table: { nzSize: 'middle' },
  card: { nzBorderless: true }
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppShareModule,
    FrameworkModule,
    BitModule.forRoot(environment.bit),
    BitSwalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    AppGuard,
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptors, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(nzIconService: NzIconService) {
    nzIconService.changeAssetsSource(environment.iconUrl);
  }
}
