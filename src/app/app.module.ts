import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {MarkdownModule} from 'ngx-markdown';
import {BitService, EventsService, HttpService, NgxBitModule} from 'dev-ngx-bit';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import {AppComponent} from './app.component';

import {Auth} from './guard/auth.service';
import {MainService} from './api/main.service';

const routes: Routes = [
  {path: '', loadChildren: './app.router.module#AppRouterModule', canActivate: [Auth]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxBitModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    Auth,
    BitService,
    EventsService,
    HttpService,
    MainService,
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
