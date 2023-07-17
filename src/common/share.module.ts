import { CdkTableModule } from '@angular/cdk/table';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/ng/table';

@NgModule({
  exports: [RouterModule, WpxShareModule, WpxModule, WpxTableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
