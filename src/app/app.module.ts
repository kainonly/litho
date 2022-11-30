import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '@env';
import { WpxRichtextModule } from '@weplanx/ng/richtext';
import { WpxStoreModule } from '@weplanx/ng/store';
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
    canActivate: [AppGuard],
    data: {
      breadcrumb: '总览'
    }
  },
  {
    path: ':namespace/pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
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
    path: ':namespace/monitor',
    loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '监控'
    }
  },
  {
    path: ':namespace/schedules',
    loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '任务调度'
    }
  },
  {
    path: ':namespace/logsystem',
    loadChildren: () => import('./logsystem/logsystem.module').then(m => m.LogsystemModule),
    canActivate: [AppGuard],
    data: {
      breadcrumb: '日志系统'
    }
  },
  { path: '', redirectTo: 'default/overview', pathMatch: 'full' }
];

if (!environment.production) {
  routes.push({
    path: '_dev',
    loadChildren: () => import('../dev/dev.module').then(m => m.DevModule),
    canActivate: [AppGuard]
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NzMessageModule,
    WpxRichtextModule.forRoot({
      url: 'https://cdn.kainonly.com/assets/editorjs/editorjs.js',
      plugins: [
        'https://cdn.kainonly.com/assets/editorjs/paragraph.js',
        'https://cdn.kainonly.com/assets/editorjs/header.js',
        'https://cdn.kainonly.com/assets/editorjs/delimiter.js',
        'https://cdn.kainonly.com/assets/editorjs/underline.js',
        'https://cdn.kainonly.com/assets/editorjs/nested-list.js',
        'https://cdn.kainonly.com/assets/editorjs/checklist.js',
        'https://cdn.kainonly.com/assets/editorjs/table.js'
      ]
    }),
    WpxStoreModule.forRoot({
      url: 'https://cdn.kainonly.com/assets/pouchdb/pouchdb-7.3.1.min.js',
      plugins: [],
      name: 'weplanx'
    }),
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
