import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { WpxHeaderComponent } from './header.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxHeaderComponent],
  exports: [WpxHeaderComponent]
})
export class WpxHeaderModule {}
