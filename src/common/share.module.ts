import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WpxCommonModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/common/table';
import { WpxModule } from '@weplanx/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  exports: [WpxModule, WpxCommonModule, WpxTableModule, NzResultModule, NzAvatarModule, NzListModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
