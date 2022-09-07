import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ShareModule } from '@console/common/share.module';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';
import { AppInterceptors } from './app.interceptors';
import { ComponentsModule } from './components/components.module';

registerLocaleData(zh);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./forget/forget.module').then(m => m.ForgetModule)
  },
  {
    path: 'unauthorize',
    loadChildren: () => import('./unauthorize/unauthorize.module').then(m => m.UnauthorizeModule)
  },
  {
    path: 'authorized',
    loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule),
    canActivate: [AppGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '主页'
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('@weplanx/ng-intgr').then(m => m.AdminModule),
    canActivate: [AppGuard]
  },
  {
    path: 'center',
    loadChildren: () => import('@weplanx/ng-intgr').then(m => m.CenterModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '个人中心'
    }
  },
  { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ShareModule,
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptors, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: NZ_CONFIG,
      useValue: <NzConfig>{
        notification: { nzPlacement: 'bottomLeft' },
        pageHeader: { nzGhost: false },
        card: { nzBorderless: true },
        table: { nzSize: 'small' },
        codeEditor: {
          assetsRoot: `https://cdn.kainonly.com/assets`
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
