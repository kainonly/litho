import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxHeaderComponent } from './header.component';
import { PathPipe } from './path.pipe';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxHeaderComponent, PathPipe],
  exports: [WpxHeaderComponent]
})
export class WpxHeaderModule {}
