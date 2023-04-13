import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxQuickModule } from '@weplanx/ng/quick';
import { WpxRichtextModule } from '@weplanx/ng/richtext';

import { RichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxRichtextModule, WpxQuickModule],
  declarations: [RichtextComponent],
  exports: [RichtextComponent]
})
export class RichtextModule {}
