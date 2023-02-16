import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';
import { TranslationComponent } from '@common/translation/translation.component';

@NgModule({
  imports: [ShareModule],
  declarations: [TranslationComponent],
  exports: [TranslationComponent]
})
export class TranslationModule {}
