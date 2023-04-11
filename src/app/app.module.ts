import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@common/components/layout/layout.component';
import { LayoutModule } from '@common/components/layout/layout.module';
import { AuthorizedComponent } from '@common/components/result/authorized/authorized.component';
import { ResultModule } from '@common/components/result/result.module';
import { UnauthorizeComponent } from '@common/components/result/unauthorize/unauthorize.component';
import { TranslationModule } from '@common/components/translation/translation.module';
import { ShareModule } from '@common/share.module';
import { WpxMediaModule } from '@weplanx/ng/media';
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
        loadChildren: () => import('./index.module').then(m => m.IndexModule),
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
      url: 'https://cdn.kainonly.com/npm/@editorjs/editorjs@2.26.5/dist/editor.min.js',
      plugins: [
        'https://cdn.kainonly.com/npm/@editorjs/paragraph@2.9.0/dist/bundle.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/header@2.7.0/dist/bundle.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/delimiter@1.3.0/dist/bundle.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/underline@1.1.0/dist/bundle.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/nested-list@1.3.0/dist/nested-list.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/checklist@1.4.0/dist/bundle.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/table@2.2.1/dist/table.min.js',
        'https://cdn.kainonly.com/npm/@editorjs/quote@2.5.0/dist/bundle.js',
        'https://cdn.kainonly.com/npm/@editorjs/code@2.8.0/dist/bundle.js',
        'https://cdn.kainonly.com/npm/@editorjs/marker@1.3.0/dist/bundle.js',
        'https://cdn.kainonly.com/npm/@editorjs/inline-code@1.4.0/dist/bundle.js'
      ]
    }),
    WpxStoreModule.forRoot({
      name: 'weplanx',
      url: 'https://cdn.kainonly.com/npm/localforage@1.10.0/dist/localforage.min.js',
      plugins: []
    }),
    WpxMediaModule.forRoot({
      url: 'https://cdn.kainonly.com/npm/cropperjs@1.5.13/dist/cropper.min.js',
      plugins: [],
      style: {
        default: {
          thumbnail: 'imageMogr2/thumbnail/400x/quality/90',
          placeholder: 'imageMogr2/thumbnail/400x/quality/50/blur/10x1'
        },
        processed: {
          thumbnail: '/quality/90',
          placeholder: '/quality/50/blur/10x1'
        }
      }
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
          assetsRoot: `https://cdn.kainonly.com/npm/monaco-editor@0.36.1/min`
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
