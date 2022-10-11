import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CenterModule } from '@common/center/center.module';
import { HeaderComponent } from '@common/header/header.component';
import { PathPipe } from '@common/header/path.pipe';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule, CenterModule],
  declarations: [HeaderComponent, PathPipe],
  exports: [HeaderComponent]
})
export class HeaderModule {}
