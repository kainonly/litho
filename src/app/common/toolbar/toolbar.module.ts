import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';
import { ToolbarComponent } from '@common/toolbar/toolbar.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
