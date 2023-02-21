import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxBlockComponent } from './block.component';

@NgModule({
  imports: [WpxShareModule, WpxModule],
  declarations: [WpxBlockComponent],
  exports: [WpxBlockComponent]
})
export class WpxBlockModule {}
