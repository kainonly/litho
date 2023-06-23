import { NgModule } from '@angular/core';

import { LayoutComponent } from '@common/components/layout/layout.component';
import { ProfileModule } from '@common/components/layout/profile/profile.module';
import { QuickModule } from '@common/components/layout/quick/quick.module';
import { TranslationModule } from '@common/components/translation/translation.module';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule, ProfileModule, QuickModule, TranslationModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
