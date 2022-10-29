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

import { external } from '../external/external';
import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';
import { AppInterceptors } from './app.interceptors';

registerLocaleData(zh);

const routes: Routes = [
  ...external,
  {
    path: ':namespace/overview',
    loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
    canActivate: [AppGuard]
  },
  {
    path: ':namespace/factory',
    loadChildren: () => import('./factory/factory.module').then(m => m.FactoryModule),
    canActivate: [AppGuard]
  },
  {
    path: ':namespace/media',
    loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
    canActivate: [AppGuard]
  },
  {
    path: ':namespace/orgs',
    loadChildren: () => import('./orgs/orgs.module').then(m => m.OrgsModule),
    canActivate: [AppGuard]
  },
  {
    path: ':namespace/monitor',
    loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
    canActivate: [AppGuard]
  },
  {
    path: ':namespace/developer',
    loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule),
    canActivate: [AppGuard]
  },
  { path: '', redirectTo: 'default/overview', pathMatch: 'full' }
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
        notification: { nzPlacement: 'bottomRight' },
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
