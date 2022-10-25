import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '@env';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';
import { AppInterceptors } from './app.interceptors';

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
    path: 'center',
    loadChildren: () => import('./center/center.module').then(m => m.CenterModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '个人中心'
    }
  },
  {
    path: ':namespace/dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '仪表盘'
    }
  },
  {
    path: ':namespace/factory',
    loadChildren: () => import('./factory/factory.module').then(m => m.FactoryModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '内容生成器'
    }
  },
  {
    path: ':namespace/media',
    loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '媒体'
    }
  },
  {
    path: ':namespace/orgs',
    loadChildren: () => import('./orgs/orgs.module').then(m => m.OrgsModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '组织'
    }
  },
  {
    path: ':namespace/security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '安全性'
    }
  },
  {
    path: ':namespace/monitor',
    loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '监控'
    }
  },
  {
    path: ':namespace/developer',
    loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '开发者'
    }
  },
  {
    path: ':namespace/settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '设置'
    }
  },
  { path: '', redirectTo: 'default/settings', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NzMessageModule,
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
