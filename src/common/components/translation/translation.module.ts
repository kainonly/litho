import { NgModule } from '@angular/core';

import { TranslationComponent } from '@common/components/translation/translation.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [TranslationComponent],
  exports: [TranslationComponent]
})
export class TranslationModule {}
