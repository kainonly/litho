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
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AppGuard]
  },
  {
    path: ':namespace',
    loadChildren: () => import('./namespace/namespace.module').then(m => m.NamespaceModule)
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
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
      url: 'https://cdn.kainonly.com/assets/localforage/localforage.min.js',
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
        table: { nzSize: 'middle' },
        codeEditor: {
          assetsRoot: `https://cdn.kainonly.com/assets`
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
