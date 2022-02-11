import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ShareModule } from '@common/share.module';
import { environment } from '@env';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

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
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AppGuard]
  },
  {
    path: 'example',
    loadChildren: () => import('./example/example.module').then(m => m.ExampleModule),
    data: {
      breadcrumb: '示例'
    },
    canActivate: [AppGuard]
  },
  {
    path: 'resources',
    loadChildren: () => import('@weplanx/resources').then(m => m.ResourcesModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '服务资源'
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('@weplanx/settings').then(m => m.SettingsModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '管理者工具'
    }
  },
  {
    path: 'center',
    loadChildren: () => import('@weplanx/center').then(m => m.CenterModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '个人中心'
    }
  },
  { path: '', redirectTo: '/pages', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ShareModule,
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
        table: { nzSize: 'middle' },
        codeEditor: {
          assetsRoot: `https://cdn.jsdelivr.net/npm/monaco-editor@latest/min`
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
