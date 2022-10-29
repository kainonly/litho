import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
