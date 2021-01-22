import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ShareModule } from 'van-skeleton';

@NgModule({
  exports: [
    ShareModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppExtModule {
}
