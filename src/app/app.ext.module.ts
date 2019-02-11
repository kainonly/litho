import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBitPipeModule} from 'dev-ngx-bit';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NgxBitPipeModule,
    MarkdownModule,
  ],
})
export class AppExtModule {
}
