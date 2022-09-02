import { NgModule } from '@angular/core';

import { WpxMediaModule, WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
