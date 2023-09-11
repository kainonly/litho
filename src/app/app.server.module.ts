import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';

import { NzI18nModule } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, HttpClientModule, HttpClientXsrfModule, NoopAnimationsModule, NzI18nModule],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
