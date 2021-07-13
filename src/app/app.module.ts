import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { FrameworkModule, TokenService } from '@vanx/framework';
import { LoginComponent, LoginModule } from '@vanx/framework/login';
import { BitModule } from 'ngx-bit';
import { BitSwalModule } from 'ngx-bit/swal';
import { AppShareModule } from '@share';
import { RouterModule, Routes } from '@angular/router';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';

registerLocaleData(en);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app-routing.module').then(m => m.AppRoutingModule),
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
    AppShareModule,
    FrameworkModule,
    LoginModule,
    BitModule.forRoot(environment.bit),
    BitSwalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
