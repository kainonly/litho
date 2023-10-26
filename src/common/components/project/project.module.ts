import { NgModule } from '@angular/core';

import { ProjectComponent } from '@common/components/project/project.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [ProjectComponent],
  exports: [ProjectComponent]
})
export class ProjectModule {}
