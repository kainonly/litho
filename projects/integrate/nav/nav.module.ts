import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { LevelPipe } from './level.pipe';
import { WpxNavComponent } from './nav.component';
import { OpenStatePipe } from './open-state.pipe';

@NgModule({
  imports: [WpxModule, WpxShareModule, RouterModule],
  declarations: [WpxNavComponent, OpenStatePipe, LevelPipe],
  exports: [WpxNavComponent]
})
export class WpxNavModule {}
