import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';
import { CmsComponentModule } from '@vanx/cms/component';

@NgModule({
  exports: [
    ShareModule,
    CmsComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppExtModule {
}
