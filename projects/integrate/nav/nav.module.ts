import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { LevelPipe } from './level.pipe';
import { WpxNavComponent } from './nav.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, RouterModule],
  declarations: [WpxNavComponent, LevelPipe],
  exports: [WpxNavComponent]
})
export class WpxNavModule {}
