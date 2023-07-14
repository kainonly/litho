import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

@NgModule({
  exports: [RouterModule, WpxShareModule, WpxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
