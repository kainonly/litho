import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { CmsComponentModule } from '@vanx/cms/component';
import { FrameworkComponentModule } from '@vanx/framework/component';

@NgModule({
  exports: [
    ShareModule,
    FrameworkComponentModule,
    CmsComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppExtModule {
}
