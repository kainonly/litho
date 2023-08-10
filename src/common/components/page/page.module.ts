import { NgModule } from '@angular/core';

import { BlankPageComponent } from '@common/components/page/blank-page.component';
import { TranslationModule } from '@common/components/translation/translation.module';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule, TranslationModule],
  declarations: [BlankPageComponent],
  exports: [BlankPageComponent]
})
export class PageModule {}
