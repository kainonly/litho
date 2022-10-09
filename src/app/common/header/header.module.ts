import { NgModule } from '@angular/core';

import { HeaderComponent } from '@common/header/header.component';
import { PathPipe } from '@common/header/path.pipe';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [HeaderComponent, PathPipe],
  exports: [HeaderComponent]
})
export class HeaderModule {}
