import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@common/components/layout/layout.component';
import { LayoutModule } from '@common/components/layout/layout.module';
import { AuthorizedComponent } from '@common/components/result/authorized/authorized.component';
import { ResultModule } from '@common/components/result/result.module';
import { UnauthorizeComponent } from '@common/components/result/unauthorize/unauthorize.component';
import { TranslationModule } from '@common/components/translation/translation.module';
import { ShareModule } from '@common/share.module';
import { environment } from '@env';
import { WpxRichtextModule } from '@weplanx/ng/richtext';
import { WpxStoreModule } from '@weplanx/ng/store';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';
import { AppInterceptors } from './app.interceptors';
import { experiments } from '../experiment/experiment';

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
    component: UnauthorizeComponent
  },
  {
    path: 'authorized',
    component: AuthorizedComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AppGuard],
        data: {
          breadcrumb: $localize`管理后台`
        }
      },
      ...experiments,
      {
        path: ':namespace',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        canActivate: [AppGuard]
      },
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    LayoutModule,
    ResultModule,
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
      url: 'https://cdn.kainonly.com/assets/localforage/localforage.min.js',
      plugins: [],
      name: 'weplanx'
    }),
    RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' }),
    NzMenuModule,
    ShareModule,
    TranslationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptors, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: NZ_CONFIG,
      useValue: <NzConfig>{
        notification: { nzPlacement: 'bottomRight' },
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
