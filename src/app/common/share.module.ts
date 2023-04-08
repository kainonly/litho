import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RichtextModule } from '@common/components/richtext/richtext.module';
import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxTableModule } from '@weplanx/ng/table';
import { WpxTagsModule } from '@weplanx/ng/tags';
import { WpxUploadModule } from '@weplanx/ng/upload';

@NgModule({
  exports: [
    RouterModule,
    WpxModule,
    WpxShareModule,
    WpxTableModule,
    WpxUploadModule,
    WpxMediaModule,
    WpxTagsModule,
    RichtextModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
