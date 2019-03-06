import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {BitFormDirective} from './bit-form.directive';
import {BitSearchDirective} from './bit-search.directive';
import {BitFormControlColDirective} from './bit-form-control-col.directive';
import {BitFormLabelColDirective} from './bit-form-label-col.directive';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    BitFormDirective,
    BitSearchDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective,
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
