import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxNavComponent } from './nav.component';
import { OpenStatePipe } from './open-state.pipe';

@NgModule({
  imports: [WpxModule, WpxShareModule, RouterModule],
  declarations: [WpxNavComponent, OpenStatePipe],
  exports: [WpxNavComponent]
})
export class WpxNavModule {}
