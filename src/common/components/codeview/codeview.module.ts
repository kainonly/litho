import { NgModule } from '@angular/core';

import { CodeviewComponent } from '@common/components/codeview/codeview.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [CodeviewComponent],
  exports: [CodeviewComponent]
})
export class CodeviewModule {}
