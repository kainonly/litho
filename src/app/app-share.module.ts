import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WpxCommonModule, WpxModule } from '@weplanx/components';
import { WpxSettingsModule } from '@weplanx/components/settings';
import { WpxTableModule } from '@weplanx/components/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  exports: [
    WpxModule,
    WpxCommonModule,
    WpxTableModule,
    WpxSettingsModule,
    NzResultModule,
    NzAvatarModule,
    NzListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppShareModule {}
