import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxRichtextModule } from '@weplanx/ng/richtext';
import { WpxTagsModule } from '@weplanx/ng/tags';

import { RichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxRichtextModule, WpxTagsModule],
  declarations: [RichtextComponent],
  exports: [RichtextComponent]
})
export class RichtextModule {}
