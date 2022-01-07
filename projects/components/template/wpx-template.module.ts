import { NgModule } from '@angular/core';

import { WpxLayoutModule } from '@weplanx/common/layout';

import { WpxTemplateComponent } from './wpx-template.component';

@NgModule({
  declarations: [WpxTemplateComponent],
  imports: [WpxLayoutModule],
  exports: [WpxTemplateComponent]
})
export class WpxTemplateModule {}
