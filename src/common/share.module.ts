import { ScrollingModule } from '@angular/cdk/scrolling';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/ng/table';
import { WpxUploadModule } from '@weplanx/ng/upload';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@NgModule({
  exports: [
    RouterModule,
    WpxModule,
    WpxShareModule,
    WpxUploadModule,
    WpxTableModule,
    NzCodeEditorModule,
    ScrollingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
