import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  exports: [WpxModule, WpxShareModule, NzResultModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
