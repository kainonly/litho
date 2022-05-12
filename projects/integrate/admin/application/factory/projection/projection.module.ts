import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { ProjectionComponent } from './projection.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ProjectionComponent]
})
export class ProjectionModule {}
