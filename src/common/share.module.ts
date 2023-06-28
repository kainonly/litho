import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

@NgModule({
  exports: [RouterModule, WpxModule, WpxShareModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
