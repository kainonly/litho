import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxRichtextModule } from '@weplanx/ng/richtext';

import { RichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxRichtextModule],
  declarations: [RichtextComponent],
  exports: [RichtextComponent]
})
export class RichtextModule {}
