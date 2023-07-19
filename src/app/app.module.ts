import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { environment } from '@env';
import { WpxStoreModule } from '@weplanx/store';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';
import { AppInterceptors } from './app.interceptors';

registerLocaleData(zh);

export let experiments: Routes = [];

if (!environment.production) {
  experiments = [
    {
      path: 'experiment',
      loadChildren: () => import('../experiment/experiment.module').then(m => m.ExperimentModule),
      data: {
        breadcrumb: `实验`
      }
    }
  ];
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    canActivate: [AppGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {
          breadcrumb: `管理后台`
        }
      },
      // {
      //   path: ':namespace',
      //   loadChildren: () => import('./index.module').then(m => m.IndexModule),
      //   canActivate: [AppGuard]
      // },
      ...experiments,
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ]
  }
];

const ngZorroConfig: NzConfig = {
  card: { nzBordered: false },
  codeEditor: {
    assetsRoot: `https://cdn.kainonly.com/npm/monaco-editor@0.40.0/min`
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    NzMessageModule,
    NzMenuModule,
    ShareModule,
    WpxStoreModule.forRoot({
      name: 'weplanx',
      url: 'https://cdn.kainonly.com/npm/localforage@1.10.0/dist/localforage.min.js',
      plugins: []
    }),
    RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptors, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
