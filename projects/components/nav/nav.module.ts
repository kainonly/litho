import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { WpxNavComponent } from './nav.component';
import { OpenStatePipe } from './open-state.pipe';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxNavComponent, OpenStatePipe],
  exports: [WpxNavComponent]
})
export class WpxNavModule {}
