import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';

import {AppComponent} from './app.component';
import {NgxBitModule, NgxBitPipeModule} from 'ngx-bit';
import { SearchClearDirective } from './search-clear.directive';


@NgModule({
  declarations: [
    AppComponent,
    SearchClearDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxBitModule,
    NgxBitPipeModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
