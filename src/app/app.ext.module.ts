import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ShareModule } from '@vanx/framework';

@NgModule({
  exports: [
    ShareModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppExtModule {
}
