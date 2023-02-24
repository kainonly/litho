import { NgModule } from '@angular/core';

import { LayoutComponent } from '@common/layout/layout.component';
import { ProfileModule } from '@common/layout/profile/profile.module';
import { QuickModule } from '@common/layout/quick/quick.module';
import { ShareModule } from '@common/share.module';
import { TranslationModule } from '@common/translation/translation.module';

@NgModule({
  imports: [ShareModule, ProfileModule, QuickModule, TranslationModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
